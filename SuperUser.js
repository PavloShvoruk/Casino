import {
    Casino
} from './Casino.js';
import {
    GameMachine
} from './GameMachine.js';
import {
    User
} from './User.js';

export class SuperAdmin extends User {
    constructor(name, money) {
        super(name, money);
        this.casinos = [];
    }

    createCasino(name) {
        this.casinos.push(new Casino(name));
    }

    createGameMachine(index, number) {
        if ((this.money -= number) > 0) {
            this.money -= number
            this.casinos[index].machines.push(new GameMachine(number))
        } else {
            throw "Not enough money to create game machine"
        }
    }

    getCasinoMoney(index, number) {
        let result = 0;
        if (index === 0 || typeof (index) === "undefined" || typeof (index) !== "number") {
            throw 'Not valid number of game machine';
        }

        if (this.casinos[index - 1] === 'undefined') {
            throw 'Such casino does not exist'
        } else {
            let sortedMachines = this.casinos[index].machines.sort(function (a, b) {
                b.getMoney - a.getMoney
            })

            for (const i of sortedMachines) {
                i.number -= number
                result += number;
            }
            return result;
        }
    }

    addCasinoMoney(number) {

    }

    deleteMachine(index) {
        if (index === 0 || typeof (index) === "undefined" || typeof (index) !== "number") {
            throw 'Not valid number of game machine';
        }

        if (typeof this.casinos[0].machines[index - 1] === 'undefined') {
            throw 'Game machine does not exist';
        } else {
            //machines array of current casino
            const gameMachines = this.casinos[0].machines;
            //amount to take from deleted machine
            const moneyAmount = gameMachines[index - 1].getMoney;

            gameMachines[index - 1].takeMachineMoney(moneyAmount);

            //human counts from 1 
            gameMachines.splice(index - 1, 1);
            //split money among the rest of machines
            for (const machine of gameMachines) {
                machine.putMoney(moneyAmount / this.casinos[0].getMachineCount)
            }
        }
    }
}