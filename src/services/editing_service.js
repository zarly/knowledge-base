
import GlobalModel from './global_model.js';

const EditingService = {
    init: function () {

    },

    addNote: function (text) {
        GlobalModel.notes.push({text: text});
    },

    addTag: function (text) {
        GlobalModel.tags.push({text: text});
    }
};

export default EditingService;
