
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

    addNote: function (text) {
        GlobalModel.notes.push({text: text});

        this.events.emit('notes:changed', GlobalModel.notes);

        Ajax({
            url: '/api/note/create',
            type: 'GET',
            data: {
                content: text
            },
            dataType: 'json',
            success: function (note, status, XMLHttpRequest) {
                console.log(note, status);
            }
        });
    },

    addTag: function (text) {
        GlobalModel.tags.push({text: text});
    },

    addTagIfNotExists: function (tagTitle, callback) {
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
    }
};

export default EditingService;
