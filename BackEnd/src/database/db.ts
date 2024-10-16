import mongoose from 'mongoose';

interface IConfiguration {
    mongoUrl: string;
    dbName: string;
}

export class DB {
    private static instance: DB;
    private mongoUri: string;
    private DbName: string;
    private connection: typeof mongoose | null = null;

    constructor({ mongoUrl, dbName }: IConfiguration) {
        this.mongoUri = mongoUrl;
        this.DbName = dbName;
    };

    public static getInstance(config: IConfiguration): DB {
        if (!DB.instance) {
            DB.instance = new DB(config);
        }
        return DB.instance;
    }

    public async connect() {
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(this.mongoUri, {
                    dbName: this.DbName
                });
                console.log('Database connected');
            } catch (error) {
                console.error('Database connection failed', error);
            }
        }
    }

    public getConnection() {
        return this.connection;
    }
};

