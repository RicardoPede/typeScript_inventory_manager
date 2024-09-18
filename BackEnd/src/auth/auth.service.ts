import { UserService } from "../users/user.service";
import { IAuthService, LoginUser, LoginUserResponse, RegisterUser } from "./interfaces/auth.interface";
import { IUser } from "../users/interface/user.interface";
import { JwtAdapter } from "../helpers/JWT";
import { BcryptAdapter } from "../helpers/bcrypt";
import { ValidRoles } from "../users/interface";

export class AuthService implements IAuthService {

    constructor(private readonly userServices: UserService) { }

    // se define un método login que recibe un objeto de tipo LoginUser y devuelve una promesa de tipo LoginUserResponse
    // el método busca un usuario por usuario, si no lo encuentra lanza un error
    // si lo encuentra, compara la contraseña con el hash almacenado en la base de datos
    // si la contraseña es incorrecta lanza un error
    // si la contraseña es correcta, genera un token con el id del usuario y lo devuelve junto con el usuario
    async login(loginUser: LoginUser): Promise<LoginUserResponse> {
        try {
            const user = await this.userServices.findOneByUsername(loginUser.username);
            if (!user) throw new Error('Login: User not found');
            const isValidPassword = await BcryptAdapter.compare(loginUser.password, user.password!);
            if (!isValidPassword) throw new Error('Invalid password');
            const token = await JwtAdapter.generateToken({ id: user._id as string });
            if (!token) throw new Error('Error generating token');
            return { user, token: token || '' };
        } catch (error) {
            console.log('login error', error);
            throw error;
        }
    };

    // 
    logout(): void {
        throw new Error('Method not implemented.');
    };

    // se define un método register que recibe un usuario y devuelve una promesa de tipo LoginUserResponse
    // async register(user: IUser): Promise<LoginUserResponse> {
    //     const newUser = await this.userServices.create(user);
    //     if (!newUser) throw new Error('Error creating user');
    //     return this.checkToken(newUser);
    // };
    async register(registerUser: RegisterUser): Promise<LoginUserResponse> {
        try {
            const existingUser = await this.userServices.findOneByUsername(registerUser.username);
            if (existingUser) throw new Error('User with that username already exists');

            const hashedPassword = await BcryptAdapter.hash(registerUser.password);
            const newUser: IUser = {
                ...registerUser,
                password: hashedPassword,
                role: registerUser.role as ValidRoles
            }

            const user = await this.userServices.create(newUser as IUser);
            const token = await JwtAdapter.generateToken({ id: user._id as string });

            return { user, token: token ?? '' };
        } catch (error) {
            console.log('register error', error);
            throw error;
        }
    }

    // se define un método checkToken que recibe un usuario y devuelve una promesa de tipo LoginUserResponse
    async checkToken(user: IUser): Promise<LoginUserResponse> {
        const token = await JwtAdapter.generateToken({ id: user._id as string });
        if (!token) throw new Error('Error generating token');
        return { user, token };
    };






};
