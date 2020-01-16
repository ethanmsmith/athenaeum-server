import mongoose, { Document, Schema } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
import {IReview} from "./review.model";

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    keywords: [string];
    reviews: [
        IReview["_id"]
    ];
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    keywords: { type: [String], required: true },
    reviews: { type: [ObjectId], required: false },
    _id: ObjectId
});

export default mongoose.model<IBook>("Book", BookSchema);
