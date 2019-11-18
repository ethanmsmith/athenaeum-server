import mongoose, { Schema, Document } from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;
import {IReview} from './review.model';

const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    keywords: { type: [String], required: true },
    reviews: { type: [ObjectId], required: false },
    _id: ObjectId
});

export interface IBook extends Document {
    title: string,
    author: string,
    genre: string,
    keywords: [string],
    reviews: [
        IReview['_id']
    ]
}

export default mongoose.model<IBook>('Book', bookSchema);