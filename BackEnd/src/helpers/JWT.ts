import jwt from 'jsonwebtoken';
import { enviroments } from '../config/envs';

interface Payload {
    id: string;
};

const secretKey = enviroments.JWT_SECRET!;

export class JwtAdapter {
    // el método generateToken recibe un objeto de tipo Payload y un string con la duración del token
    static async generateToken(payload: Payload, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secretKey, { expiresIn: duration }, (err, token) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(token as string);
                }
            });
        });
    };

    // el método verifyToken recibe un string con el token y devuelve una promesa de tipo T o null
    static async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) resolve(null);
                resolve(decoded as T);
            });
        });
    }
}