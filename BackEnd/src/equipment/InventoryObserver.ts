import { Inventory, Observer} from './Inventory';

class InventoryObserver implements Observer {
    update(data: any) {
        console.log('Inventory updated:', data);
    }
}

const inventory = new Inventory();
const observer = new InventoryObserver();

inventory.addObserver(observer);
inventory.addEquipment({ name: 'equipment 1' });
inventory.addEquipment({ name: 'equipment 2' });

export { InventoryObserver };