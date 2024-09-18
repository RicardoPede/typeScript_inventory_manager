import { IUser } from "../../users/interface";

export interface IAuthService {
    login( user:LoginUser): Promise<LoginUserResponse>;
    logout(): void;
    register(user:IUser): Promise<LoginUserResponse>;
    checkToken(user:IUser): Promise<LoginUserResponse>;
};

export interface LoginUser {
    username: string;
    password: string;
};

export interface LoginUserResponse {
    user: IUser;
    token: string;
};

export interface RegisterUser {
    name: string,
    username: string,
    password: string,
    email: string,
    dni: string,
    phone: string,
    address: string,
    city: string,
    role?: string
};

