import { Equipment } from './entities/equipment';
import { IEquipment, IEquipmentService } from './interface/equipment.interface';
import { MovementHistory } from '../movementHistory/entities/movementHistory';

export class EquipmentService implements IEquipmentService {
    
    async create(equipment: IEquipment, userId: string): Promise<IEquipment> {
        try {
            const newEquipment = new Equipment(equipment);
            const savedEquipment = await newEquipment.save();

            const initialMovement = new MovementHistory({
                equipment: savedEquipment._id,
                user: userId,
                fromLocation: 'Warehouse',
                toLocation: 'Warehouse',
                movementType: 'IN',
                movementDate: new Date()
            });
            await initialMovement.save();

            return savedEquipment.toObject() as unknown as IEquipment;
        } catch (error) {
            console.error('Error creating equipment:', error);
            throw new Error('Error creating equipment');
        }
    };

    async findAll(): Promise<IEquipment[]> {
        return await Equipment.find();
    };

    async findOne(id: string): Promise<IEquipment> {
        const equipment = await Equipment.findOne({ _id: id });
        if (!equipment) {
            throw new Error('Equipment not found');
        }
        return equipment.toObject() as unknown as IEquipment;
    };

    async update(id: string, equipment: IEquipment): Promise<void> {
        const updatedEquipment = await Equipment.updateOne({ _id: id }, equipment);
        if (updatedEquipment.modifiedCount === 0) throw new Error('Equipment not found');
    };

    async remove(id: string): Promise<void> {
        const deletedEquipment = await Equipment.deleteOne({ _id: id });
        if (deletedEquipment.deletedCount === 0) throw new Error('Equipment not found');
    };
};