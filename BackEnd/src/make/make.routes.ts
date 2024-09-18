import { Router } from 'express';
import { MakeController } from './make.controllers';
import { MakeService } from './make.service';

export class MakeRoutes {
    static get routes(): Router {
        const router = Router();
        const makeService = new MakeService();
        const makeController = new MakeController(makeService);

        router.post('/', makeController.create);
        router.get('/', makeController.findAll);
        router.get('/:id', makeController.findOne);
        router.put('/:id', makeController.update);
        router.delete('/:id', makeController.remove);

        return router;
    }
}