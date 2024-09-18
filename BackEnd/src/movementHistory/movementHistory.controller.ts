import { Request, Response } from "express";
import { MovementHistoryService } from "./movementHistory.service";

export class MovementHistoryController {
    constructor(private movementHistoryService: MovementHistoryService) { }

    handleError = (error: any, res: Response) => {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'MovementHistory already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    create = async (req: Request, res: Response) => {
        try {
            const movementHistory = await this.movementHistoryService.createMovement(req.body);
            res.status(201).json(movementHistory);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    registerMovement = async (req: Request, res: Response) => {
        try {
            const { equipmentId, userId, fromLocation, toLocation, movementType } = req.body;
            const movementHistory = await this.movementHistoryService.registerMovement(equipmentId, userId, fromLocation, toLocation, movementType);
            res.status(201).json(movementHistory);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const movementHistory = await this.movementHistoryService.getAllMovements();
            res.status(200).json(movementHistory);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const movementHistory = await this.movementHistoryService.getMovementById(req.params.id);
            res.status(200).json(movementHistory);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            await this.movementHistoryService.updateMovement(req.params.id, req.body);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    remove = async (req: Request, res: Response) => {
        try {
            await this.movementHistoryService.deleteMovement(req.params.id);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}