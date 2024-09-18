import bcrypt from 'bcrypt';

// Se crea una clase BcryptAdapter con dos métodos estáticos: hash y compare
export class  BcryptAdapter {
    // el método hash recibe una contraseña y devuelve una promesa de tipo string
    static async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    // el método compare recibe una contraseña y un hash y devuelve una promesa de tipo boolean
    static async compare(password: string, hash: string): Promise<boolean> {
        console.log('bcrypt.compare', password, hash);
        const result = await bcrypt.compare(password, hash);
        console.log('bcrypt.compare', result);
        return result;
    }
};
