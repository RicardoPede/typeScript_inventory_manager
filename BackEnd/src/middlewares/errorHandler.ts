import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({ message: err.message || 'An unknown error occurred' });
}

export default errorHandler;