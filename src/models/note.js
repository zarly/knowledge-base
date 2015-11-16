
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

var NoteSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    tags: {type: Array, default: []},
    book: {type: String}
});

export default mongoose.model('Note', NoteSchema);
