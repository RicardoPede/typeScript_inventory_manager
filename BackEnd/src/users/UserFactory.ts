import { ValidRoles } from "./interface";
import { Observer } from "../equipment/Inventory";

interface User {
    role: string;
    permissions: string[];
}

export class Admin implements User, Observer {
    role = 'admin';
    permissions = ['create', 'read', 'update', 'delete'];

    update(data: any) {
        console.log('Inventory updated:', data);
    }
}

class Technician implements User {
    role = 'technician';
    permissions = ['read', 'update'];
}

class UserFactory {
    static createUser(type: ValidRoles): User {
        switch (type) {
            case ValidRoles.ADMIN:
                return new Admin();
            case ValidRoles.TECHNICIAN:
                return new Technician();
            case ValidRoles.USER:
                return { role: ValidRoles.USER, permissions: ['read'] };
            default:
                throw new Error('Invalid user type');
        }
    }
}

export default UserFactory;