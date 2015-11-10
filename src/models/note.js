
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

var NoteSchema = new Schema({
    content: {type: String},
    book: {type: String}
});

export default mongoose.model('Note', NoteSchema);
