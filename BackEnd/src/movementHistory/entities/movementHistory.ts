import { Schema, model, Document } from "mongoose";

export interface IMovementHistory extends Document {
    equipment: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    fromLocation: string;
    toLocation: string;
    movementType: string;
    movementDate: Date;
}

const MovementHistorySchema = new Schema({
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    movementType: { type: String, required: true },
    movementDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export const MovementHistory = model<IMovementHistory>('MovementHistory', MovementHistorySchema);