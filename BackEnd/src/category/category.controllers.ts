import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    handleError = (error: any, res: Response) => {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    create = async (req: Request, res: Response) => {
        console.log('req.body', req.body);
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    findOne = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.getCategoryById(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            await this.categoryService.updateCategory(req.params.id, req.body);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };

    remove = async (req: Request, res: Response) => {
        try {
            await this.categoryService.deleteCategory(req.params.id);
            res.status(204).end();
        } catch (error) {
            this.handleError(error, res);
        }
    };
}