import { Router } from 'express';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controllers';
import { ExpressValidatorAdapter } from '../helpers/express-validator';
import { createCategorySchema, updateCategorySchema } from './schemas/category.schema';
import { ValidRoles } from '../users/interface';
import { GetUserMiddleware } from '../middlewares/getUser.middleware';
import { UserService } from '../users/user.service';

export class CategoryRoutes {

    static get routes(): Router {

        const router = Router();

        const userService = new UserService();
        const getUser = new GetUserMiddleware(userService)

        const categoryService = new CategoryService();
        const categoryController = new CategoryController(categoryService);
        const validator = ExpressValidatorAdapter.validate;

        router.get('/', categoryController.findAll.bind(categoryController));
        router.get('/:id', categoryController.findOne.bind(categoryController));
        router.post('/', getUser.checkRole([ValidRoles.ADMIN]), createCategorySchema, validator, categoryController.create.bind(categoryController));
        router.put('/:id', getUser.checkRole([ValidRoles.ADMIN]), updateCategorySchema, validator, categoryController.update.bind(categoryController));
        router.delete('/:id', getUser.checkRole([ValidRoles.ADMIN]), categoryController.remove);

        return router;
    }
}