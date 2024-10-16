import { Request, Response, Router } from 'express';
import { UsersRoutes } from '../users/user.routes';
import { AuthRoutes } from '../auth/auth.routes';
import { EquipmentRoutes } from '../equipment/equipment.routes';
import { CategoryRoutes } from '../category/category.routes';
import { MovementHistoryRoutes } from '../movementHistory/movementHistory.routes';
import { MakeRoutes } from '../make/make.routes';
import { UserService } from '../users/user.service';
import { GetUserMiddleware } from '../middlewares/getUser.middleware';
import { ValidRoles } from '../users/interface';
import { EquipmentService } from '../equipment/equipment.service';
import { EquipmentController } from '../equipment/equipment.controller';

export class AppRouter {
   static get routes(): Router {
        const router = Router();

        const userService = new UserService();
        const getUser = new GetUserMiddleware(userService)

        router.get('/', (req:Request, res:Response) => {
             res.send('Hello Typescripero');
        });
        router.use('/api/auth', AuthRoutes.routes);
        
        router.use('/api/users', getUser.getUser, getUser.checkRole([ValidRoles.ADMIN]), UsersRoutes.routes);

        router.use('/api/equipments', getUser.getUser, EquipmentRoutes.routes);
        
        router.use('/api/categories', CategoryRoutes.routes);

        router.use('/api/movementHistory', getUser.getUser, getUser.checkRole([ValidRoles.ADMIN]), MovementHistoryRoutes.routes);

        router.use('/api/make', MakeRoutes.routes);

        return router;
   };
};