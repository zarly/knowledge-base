
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

var NoteSchema = new Schema({
    content: {type: String},
    book: {type: String},
    updatedAt: {type: Date},
    createdAt: {type: Date}
});

export default mongoose.model('Note', NoteSchema);
