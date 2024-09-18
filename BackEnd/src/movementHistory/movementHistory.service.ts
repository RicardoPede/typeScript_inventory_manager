import { MovementHistory } from "./entities/movementHistory";
import { IMovementHistory, IMovementHistoryService } from "./interface/movementHistory.interface";

export class MovementHistoryService implements IMovementHistoryService {
    public async getAllMovements(): Promise<IMovementHistory[]> {
        const movements = await MovementHistory.find().populate('equipment').populate('user') as unknown as IMovementHistory[];
        return movements;
    }

    public async getMovementById(id: string): Promise<IMovementHistory> {
        const movement = await MovementHistory.findById(id).populate('equipment').populate('user');
        if (!movement) {
            throw new Error(`Movement with id ${id} not found`);
        }
        return movement.toObject() as unknown as IMovementHistory;
    }

    public async createMovement(movement: IMovementHistory): Promise<IMovementHistory> {
        const newMovement = await MovementHistory.create(movement);
        return newMovement.toObject() as unknown as IMovementHistory;
    }

    public async updateMovement(id: string, movement: IMovementHistory): Promise<IMovementHistory> {
        const updatedMovement = await MovementHistory.findByIdAndUpdate(movement._id, movement, { new: true });
        if (!updatedMovement) {
            throw new Error(`Movement with id ${movement._id} not found`);
        }
        return updatedMovement.toObject() as unknown as IMovementHistory;
    }

    public async registerMovement(equipmentId: string, userId: string, fromLocation: string, toLocation: string, movementType: string): Promise<IMovementHistory> {
        const movement: IMovementHistory = {
            equipment: equipmentId,
            user: userId,
            fromLocation,
            toLocation,
            movementType,
            movementDate: new Date()
        };
        const newMovement = await MovementHistory.create(movement);
        return newMovement.toObject() as unknown as IMovementHistory; 
    }

    public async deleteMovement(id: string): Promise<void> {
        await MovementHistory.findByIdAndDelete(id);
    }
}