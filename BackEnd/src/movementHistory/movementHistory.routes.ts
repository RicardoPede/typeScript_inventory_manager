import { Router } from "express";
import { MovementHistoryService } from "./movementHistory.service";
import { MovementHistoryController } from "./movementHistory.controller";
import { ExpressValidatorAdapter } from "../helpers/express-validator";
import { createMovementHistorySchema, updateMovementHistorySchema } from "./schemas/movementHistory.schema";

export class MovementHistoryRoutes {

    static get routes(): Router {

        const router = Router();

        const movementHistoryService = new MovementHistoryService();
        const movementHistoryController = new MovementHistoryController(movementHistoryService);
        const validator = ExpressValidatorAdapter.validate;

        router.get('/', movementHistoryController.findAll.bind(movementHistoryController));
        router.get('/:id', movementHistoryController.findOne.bind(movementHistoryController));
        router.post('/', createMovementHistorySchema, validator, movementHistoryController.create.bind(movementHistoryController));
        router.put('/:id', updateMovementHistorySchema, validator, movementHistoryController.update.bind(movementHistoryController));
        router.delete('/:id', movementHistoryController.remove);
        router.post('/register', movementHistoryController.registerMovement.bind(movementHistoryController));

        return router;
    };
};