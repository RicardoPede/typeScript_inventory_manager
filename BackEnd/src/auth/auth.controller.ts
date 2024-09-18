import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { validationResult } from "express-validator";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    };

    // se define un método handleErrors que recibe un error y una respuesta
    handleErrors(error: any, res: Response) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'User with that username already exists' });
        } else if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' });
        } else if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    };

    // se define un método login que recibe una petición y una respuesta
    login = async (req: Request, res: Response) => {
        console.log('req.body', req.body);
        try {
            const login = await this.authService.login(req.body); // se llama al método login del servicio authService
            res.status(200).json(login);
        } catch (error) {
            this.handleErrors(error, res);
        };
    };

    // se define un método register que recibe una petición y una respuesta
    register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const register = await this.authService.register(req.body);
            res.status(200).json(register);
        } catch (error) {
            this.handleErrors(error, res);
        };
    };

    // se define un método checkToken que recibe una petición y una respuesta
    checkToken = async (req: Request, res: Response) => {
        try {
            const checkToken = await this.authService.checkToken(req.user!);
            res.status(200).json(checkToken);
        } catch (error) {
            this.handleErrors(error, res);
        };
    };
};