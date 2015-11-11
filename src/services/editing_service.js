
import GlobalModel from './global_model.js';
import EEV from '../vendor/eev.js';
import Ajax from '../vendor/ajax.min.js';

const EditingService = {
    init: function () {
        this.events = new EEV();
    },

    on: function () {
        if (this.events) {
            this.events.on.apply(this.events, arguments);
        }
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
    }
};

export default EditingService;
