import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Inventory } from "../equipment/Inventory";
import { InventoryObserver } from "../equipment/InventoryObserver";

export class UserController {
    constructor(
        private userService: UserService,
        private inventory: Inventory
    ) {
        inventory = new Inventory();
        const observer = new InventoryObserver();
        this.inventory.addObserver(observer);
    }

    addNewEquipment(equipment: any) {
        this.inventory.addEquipment(equipment);
    }

    handleError = (error: any, res: Response) => {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'User already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    create = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.findOne(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            await this.userService.update(req.params.id, req.body);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    remove = async (req: Request, res: Response) => {
        try {
            await this.userService.remove(req.params.id);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}