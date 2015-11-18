
import GlobalModel from './global_model.js';
import EEV from '../vendor/eev.js';
import Ajax from '../vendor/ajax.js';

const EditingService = {
    init: function () {
        this.events = new EEV();
    },

    on: function () {
        if (this.events) {
            this.events.on.apply(this.events, arguments);
        }
    },

    getTagsBySearchQuery: function (searchQuery, callback) {
        Ajax({
            url: '/api/logic/get_tags_by_string_beginning',
            type: 'GET',
            data: {
                search: searchQuery
            },
            dataType: 'json',
            success: function (result, status, XMLHttpRequest) {
                callback(null, result.tags);
            }
        });
    },

    addNote: function (title, content, tags) {
        var newNote = {
            title: title || '',
            content: content || '',
            tags: [].concat(GlobalModel.tags.map((tag) => tag.title) || [], tags || [])
        };
        GlobalModel.notes.push(newNote);

        this.events.emit('notes:changed', GlobalModel.notes);

        Ajax({
            url: '/api/note/create',
            type: 'GET',
            data: newNote,
            dataType: 'json',
            success: function (note, status, XMLHttpRequest) {
                console.log(note, status);
            }
        });
    },

    addTagLocally: function (tagTitle) {
        GlobalModel.tags.push({title: tagTitle});

        this.events.emit('tags:changed', GlobalModel.tags);

        this.refreshListOfNotesForNewListOfTags(function () {});
    },

    updateNotesListLocally: function (notes) {
        GlobalModel.notes = notes;

        this.events.emit('notes:changed', GlobalModel.notes);
    },

    addTagIfNotExists: function (tagTitle, callback) {
        this.addTagLocally(tagTitle);

        Ajax({
            url: '/api/logic/add_tag_if_not_exists',
            type: 'GET',
            data: {
                title: tagTitle
            },
            dataType: 'json',
            success: function (tag, status, XMLHttpRequest) {
                callback(null, tag);
            }
        });
    },

    refreshListOfNotesForNewListOfTags: function (callback) {
        Ajax({
            url: '/api/logic/get_notes_for_list_of_tags',
            type: 'GET',
            data: {
                tags: GlobalModel.tags.map((tag) => tag.title)
            },
            dataType: 'json',
            success: function (result, status, XMLHttpRequest) {
                this.updateNotesListLocally (result.notes);
                callback(null, result.notes);
            }.bind(this)
        });
    }
};

export default EditingService;
