import { Schema, model, Document } from "mongoose";

export interface IEquipment extends Document {
    name: string;
    make: Schema.Types.ObjectId;
    description: string;
    serialNumber: string;
    category: Schema.Types.ObjectId;
    status: string;
    location: string;
    purchaseDate: Date;
    image: string;
    price: number;
    stock: number;
}

const EquipmentSchema = new Schema({
    name: { type: String, required: true },
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true },
    description: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export const Equipment = model<IEquipment>('Equipment', EquipmentSchema);