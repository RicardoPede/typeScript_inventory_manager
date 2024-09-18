export interface IMake {
    _id?: string
    name: string;
}

export interface IMakeService {
    create(marca: IMake): Promise<IMake>;
    findAll(): Promise<IMake[]>;
    findOne(id: string): Promise<IMake>;
    update(id: string, make: IMake): Promise<void>;
    remove(id: string): Promise<void>;
};