import { Request, Response } from "express";
import { EquipmentService } from "./equipment.service";
import { Inventory } from "./Inventory";
import { InventoryObserver } from "./InventoryObserver";

export class EquipmentController {
    constructor(
        private equipmentService: EquipmentService,
        private inventory: Inventory
    ) {
        const observer = new InventoryObserver();
        this.inventory.addObserver(observer);
    }

    handleError = (error: any, res: Response) => {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Equipment already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    create = async (req: Request, res: Response) => {
        console.log('req.body', req.body);
        try {
            const equipment = req.body;
            const userId = req.user?._id;

            if (!userId) {
                return res.status(401).json({ message: 'Controller Equipment: Unauthorized' });
            }
            
            const newEquipment = await this.equipmentService.create(equipment, userId);
            
            this.inventory.addEquipment(newEquipment);
            
            res.status(201).json(newEquipment);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const equipments = await this.equipmentService.findAll();
            res.status(200).json(equipments);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const equipment = await this.equipmentService.findOne(req.params.id);
            res.status(200).json(equipment);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            await this.equipmentService.update(req.params.id, req.body);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    remove = async (req: Request, res: Response) => {
        try {
            await this.equipmentService.remove(req.params.id);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}