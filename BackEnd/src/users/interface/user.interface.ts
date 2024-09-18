import { ValidRoles } from "./valid-roles.interface";

export interface IUser {
    _id?: string
    name: string;
    username: string;
    password: string;
    email: string;
    dni: string;
    phone: string;
    address: string;
    city: string;
    role?: ValidRoles;
};

export interface IUserService {
    create(user: IUser): Promise<IUser>;
    findAll(): Promise<IUser[]>;
    findOne(id: string): Promise<IUser>;
    update(id: string, user: IUser): Promise<void>;
    updatePassword(id: string, password: string): Promise<void>;
    remove(id: string): Promise<void>;
};