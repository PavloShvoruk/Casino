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
        if (this.money === 0) {
            throw 'Not enough money to create machine';
        } else if ((this.money - number) < 0) {
            //TODO: notification
            throw 'Not enough money to create machine.'
        } else {
            this.casinos[index].machines.push(new GameMachine(number));
        }
    }

    getCasinoMoney(index, number) {
        let result = 0;
        if (index === 0 || typeof (index) === "undefined" || isNaN(index)) {
            throw 'Not valid number of game machine';
        }

        if (this.casinos[index - 1] === 'undefined') {
            throw 'Such casino does not exist'
        } else {
            let sortedMachines = this.casinos[index].machines.sort(function (a, b) {
                b.getMoney - a.getMoney
            })

            for (const i of sortedMachines) {
                //take all remaining amount if number argument bigger
                if ((i.number - number) < 0) {
                    i.number -= i.getMoney;
                    result += i.getMoney;
                } else {
                    i.number -= number;
                    result += number;
                }
            }
            return result;
        }
    }

    //TODO
    addCasinoMoney(index, number) {

    }

    deleteMachine(index) {
        if (index === 0 || typeof (index) === "undefined" || isNaN(index)) {
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

            //count from 1 
            gameMachines.splice(index - 1, 1);
            //split money among the rest of machines
            for (const machine of gameMachines) {
                machine.putMoney(moneyAmount / this.casinos[0].getMachineCount)
            }
        }
    }
}