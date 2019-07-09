export class Casino {
    constructor(name) {
        this.name = name;
        this.machines = [];
    }

    get getMoney() {
        let result = 0;

        for (const machine of this.machines) {
            result += machine.getMoney
        }
        return result;
    }

    get getMachineCount() {
        return this.machines.length;
    }
}