import { IMake, IMakeService } from './interface/make.interface';
import { Make } from './entities/make';

export class MakeService implements IMakeService {
    async create(make: IMake): Promise<IMake> {
        const newMake = new Make(make);
        return await newMake.save() as IMake;
    }

    async findAll(): Promise<IMake[]> {
        return await Make.find();
    }

    async findOne(id: string): Promise<IMake> {
        const make = await Make.findById(id);
        if (!make) {
            throw new Error('Make not found');
        }
        return make as IMake;
    }

    async update(id: string, make: IMake): Promise<void> {
        const updatedMake = await Make.updateOne({ _id: id }, make);
        if (updatedMake.modifiedCount === 0) throw new Error('Make not found');
    }

    async remove(id: string): Promise<void> {
        const deletedMake = await Make.deleteOne({ _id: id });
        if (deletedMake.deletedCount === 0) throw new Error('Make not found');
    }
}