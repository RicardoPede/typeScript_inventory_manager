import { Schema, model, Document } from "mongoose";

export interface IMake extends Document {
    name: string;
}

const MakeSchema = new Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    versionKey: false
});

export const Make = model<IMake>('Make', MakeSchema);