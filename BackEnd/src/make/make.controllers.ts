import { Request, Response } from "express";
import { MakeService } from "./make.service";

export class MakeController {
    constructor(private makeService: MakeService) { }

    handleError = (error: any, res: Response) => {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Make already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    create = async (req: Request, res: Response) => {
        console.log(req.body);
        try {
            const make = req.body;
            const newMake = await this.makeService.create(make);
            res.status(201).json(newMake);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const makes = await this.makeService.findAll();
            res.status(200).json(makes);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const make = await this.makeService.findOne(req.params.id);
            res.status(200).json(make);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            await this.makeService.update(req.params.id, req.body);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    remove = async (req: Request, res: Response) => {
        try {
            await this.makeService.remove(req.params.id);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}