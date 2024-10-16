import { User } from "./entities/user";
import { IUser, IUserService } from "./interface/user.interface";
import { BcryptAdapter } from "../helpers/bcrypt";
import UserFactory from "./UserFactory";
import { ValidRoles } from "./interface";

export class UserService implements IUserService {
    
    // se define un método findOneByUsername que recibe un username y devuelve una promesa de tipo IUser
    async findOneByUsername(username: string): Promise<IUser | null> {
        const user = await User.findOne({ username }).exec();
        console.log('user', user);
        return user as unknown as IUser;
    }

    // se define un método create que recibe un usuario y devuelve una promesa de tipo IUser
    async create(userData: IUser): Promise<IUser> { 
        const userRole = userData.role ? userData.role : ValidRoles.USER;
        const hashedPassword = await BcryptAdapter.hash(userData.password!);
        const user = UserFactory.createUser(userRole);
        const newUser = new User({ ...userData, password: hashedPassword, role: user.role });
        return (await newUser.save()).toObject() as unknown as IUser;
    };  

    // se define un método findAll que devuelve una promesa de tipo IUser[]
    async findAll(): Promise<IUser[]> {
        return await User.find();
    };

    // se define un método findOne que recibe un id y devuelve una promesa de tipo IUser
    async findOne(id: string): Promise<IUser> {
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw new Error('User not found');
        }
        return user.toObject() as unknown as IUser;
    };

    // se define un método update que recibe un id y un usuario y devuelve una promesa de tipo void
    async update(id: string, user: IUser): Promise<void> {
        const existingUser = await User.findOne({ _id: id });
        if (!existingUser) throw new Error('User not found');

        if (user.password && user.password !== existingUser.password) {
            user.password = await BcryptAdapter.hash(user.password);
        }
        
        const updatedUser = await User.updateOne({ _id: id }, user);
        if (updatedUser.modifiedCount === 0) throw new Error('User not found');
    };

    // se define un método updatePassword que recibe un id y un password y devuelve una promesa de tipo void
    async updatePassword(id: string, password: string): Promise<void> {
        const hashedPassword = await BcryptAdapter.hash(password);
        const updatedUser = await User.updateOne({ _id: id }, { password: hashedPassword });
        if (updatedUser.modifiedCount === 0) throw new Error('User not found');
    };

    // se define un método remove que recibe un id y devuelve una promesa de tipo void
    async remove(id: string): Promise<void> {
        const deletedUser = await User.deleteOne({ _id: id });
        if (deletedUser.deletedCount === 0) throw new Error('User not found');
    };
};