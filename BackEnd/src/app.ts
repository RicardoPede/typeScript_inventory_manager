import { Server } from "./server";
import { AppRouter } from "./router/AppRouter";
import { enviroments } from "./config/envs";
import { DB } from "./database/db";
import UserFactory from "./users/UserFactory";
import { ValidRoles } from "./users/interface";
import { Inventory } from "./equipment/Inventory";
import { InventoryObserver } from "./equipment/InventoryObserver";
import { Admin } from "./users/UserFactory";

(
    async () => {
        const server = new Server({
            port: enviroments.port,
            routes: AppRouter.routes
        });
        const dbConfig = {
            mongoUrl: enviroments.MONGO_URL!,
            dbName: enviroments.DB_NAME!
        };
        const db = DB.getInstance(dbConfig);
        await db.connect();

        const adminUser = UserFactory.createUser(ValidRoles.ADMIN);
        const technicianUser = UserFactory.createUser(ValidRoles.TECHNICIAN);
        console.log(adminUser);
        console.log(technicianUser);

        const inventory = new Inventory();
        const observer = new InventoryObserver();
        const adminObserver = new Admin()
        inventory.addObserver(observer);
        inventory.addObserver(adminObserver);

        server.start();
    }
)()