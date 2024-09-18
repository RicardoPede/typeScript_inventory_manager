export interface IMovementHistory {
    _id?: string;
    equipment: string;
    user: string;
    fromLocation: string;
    toLocation: string;
    movementType: string;
    movementDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMovementHistoryService {
    getAllMovements(): Promise<IMovementHistory[]>;
    getMovementById(id: string): Promise<IMovementHistory>;
    createMovement(movement: IMovementHistory): Promise<IMovementHistory>;
    updateMovement(id: string, movement: IMovementHistory): Promise<IMovementHistory>;
    deleteMovement(id: string): Promise<void>;
}