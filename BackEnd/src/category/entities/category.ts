import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
}

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export const Category = model<ICategory>('Category', CategorySchema);