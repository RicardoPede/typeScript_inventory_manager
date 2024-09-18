import { Router } from 'express';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { ExpressValidatorAdapter } from '../helpers/express-validator';
import { createEquipmentSchema, updateEquipmentSchema } from './schemas/equipment.schema';
import { UserService } from '../users/user.service';
import { GetUserMiddleware } from '../middlewares/getUser.middleware';
import { ValidRoles } from '../users/interface';

export class EquipmentRoutes {

    static get routes(): Router {

        const router = Router();

        const userService = new UserService();
        const getUser = new GetUserMiddleware(userService)

        const equipmentService = new EquipmentService();
        const equipmentController = new EquipmentController(equipmentService);
        const validator = ExpressValidatorAdapter.validate;

        router.get('/', getUser.getUser, equipmentController.findAll);
        router.get('/:id', equipmentController.findOne);
        router.post('/', getUser.checkRole([ValidRoles.ADMIN]), createEquipmentSchema, validator, equipmentController.create);
        router.put('/:id', getUser.checkRole([ValidRoles.ADMIN]), updateEquipmentSchema, validator, equipmentController.update);
        router.delete('/:id', getUser.checkRole([ValidRoles.ADMIN]), equipmentController.remove);

        return router;
    }
}