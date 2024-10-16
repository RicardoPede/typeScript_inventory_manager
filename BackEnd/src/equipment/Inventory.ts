export interface Observer {
    update(data: any): void;
}

class Inventory {
    private observers: Observer[] = [];
    private equipmentList: any[] = [];

    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.equipmentList);
        }
    }

    addEquipment(equipment: any) {
        this.equipmentList.push(equipment);
        this.notifyObservers();
    }
}

export { Inventory };