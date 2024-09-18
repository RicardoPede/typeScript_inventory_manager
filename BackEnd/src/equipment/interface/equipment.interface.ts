export interface IEquipment {
    _id?: string
    name: string;
    description: string;
    serialNumber: string;
    category: string;
    status: string;
    location: string;
    purchaseDate: Date;
    image: string;
    precio: number;
    stock: number;
}

export interface IEquipmentService {
    create(equipment: IEquipment, userId: string): Promise<IEquipment>;
    findAll(): Promise<IEquipment[]>;
    findOne(id: string): Promise<IEquipment>;
    update(id: string, equipment: IEquipment): Promise<void>;
    remove(id: string): Promise<void>;
};