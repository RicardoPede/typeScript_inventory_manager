import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../helpers/JWT";
import { UserService } from "../users/user.service";
import { IUser } from "../users/interface";
import { ValidRoles } from "../users/interface/valid-roles.interface";

export class GetUserMiddleware {
    constructor(private readonly userService: UserService) { };

    // el método getUser recibe una petición, una respuesta y una función next
    // verifica si existe un token en los headers de la petición
    // verifica si el token es válido
    // busca al usuario en la base de datos
    // si no existe devuelve un status 404
    // si existe almacena el usuario en la petición y llama a la función next
    getUser = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
        const token = authHeader.split(' ')[1];

        const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
        if (!payload) return res.status(401).json({ message: 'Unauthorized' });

        const user = await this.userService.findOne(payload.id);
        if (!user) return res.status(404).json({ message: 'Middleware: User not found' });

        req.user = user as IUser;
        next();
    };

    checkRole = (roles: ValidRoles[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user as IUser;

            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            if (!roles.includes(user.role as ValidRoles)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient role' });
            }

            next();
        };
    }
}