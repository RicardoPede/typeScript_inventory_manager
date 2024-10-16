import express, { Router, Application, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import { Inventory } from './equipment/Inventory';
import { EquipmentService } from './equipment/equipment.service';
import { EquipmentController } from './equipment/equipment.controller';

const inventory = new Inventory();
const equipmentService = new EquipmentService();
const equipmentController = new EquipmentController(equipmentService, inventory);

interface IServerConfig {
    port: number;
    routes: Router;
}

interface IServer {
    start(): void;
}

export class Server implements IServer { // aquí se define la clase Server, que implementa la interfaz IServer
    private readonly app: Application = express(); // se define la propiedad app de tipo Application, que es igual a express(); read-only para que no se pueda modificar
    private readonly routes: Router;
    private readonly port: number;

    constructor({ port, routes }: IServerConfig) {
        this.port = port;
        this.routes = routes
        this.middlewares();
        this.errorHandling();
    };

    private middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use('/', this.routes);
    };

    private errorHandling() {
        this.app.use(errorHandler);
    };

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on  http://localhost:${this.port}`);
        });
    };


}