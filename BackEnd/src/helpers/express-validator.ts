import { NextFunction, Request, Response } from 'express';
import {validationResult} from 'express-validator';

// ExpressValidatorAdapter es una clase que contiene un método estático llamado validate
// el método validate recibe una petición, una respuesta y una función next
// verifica si hay errores en la validación de la petición
// si hay errores devuelve un status 400 con los errores
// si no hay errores llama a la función next
export class ExpressValidatorAdapter {
    static validate = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation errors', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};