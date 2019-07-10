import { Casino } from "./Casino.js";
import { GameMachine } from "./GameMachine.js";
import { User } from "./User.js";
import { findCasino, findMachine } from "./Helpers.js";

export class SuperAdmin extends User {
  constructor(name, money) {
    super(name, money);
    this.casinos = [];
  }

  createCasino(name) {
    this.casinos.push(new Casino(name));
  }

  createGameMachine(casinoName, number) {
    if (isNaN(number)) {
      throw new Error("Not valid sum of money");
    }
    if (this.money === 0) {
      throw new Error("Not enough money to create machine");
    } else if (this.money - number < 0) {
      throw new Error("You don't have enough money to create this machine");
    } else {
      this.money -= number;
      findCasino(this, casinoName).machines.push(new GameMachine(number));
    }
  }

  getCasinoMoney(casinoName, number) {
    if (isNaN(number)) {
      throw new Error("Not valid sum of money");
    }
    let result = 0;
    const casino = findCasino(this, casinoName);
    //sort machines from biggest amount of money to smallest
    let sortedMachines = casino.machines.sort(function(a, b) {
      b.getMoney - a.getMoney;
    });
    //take money from all machines
    for (const i of sortedMachines) {
      try {
        i.takeMachineMoney(number);
        result += number;
      } catch (error) {
        //take all remaining money in machine if amount bigger
        const currentBalance = i.getMoney;
        i.takeMachineMoney(i.getMoney);
        result += currentBalance;
        console.log(
          `${
            error.message
          } Program will take remaining amount - ${currentBalance}`
        );
      }
    }
    return result;
  }

  addMoney(number, machineNumber, casinoName) {
    if (isNaN(number)) {
      throw new Error("Not valid sum of money");
    }
    try {
      let machine = findMachine(this, casinoName, machineNumber);
      machine.putMoney(number);
      return machine;
    } catch (error) {
      console.log(error.message);
    }
  }

  deleteMachine(index, casinoName) {
    if (index === 0 || isNaN(index)) {
      throw new Error("Not valid number of game machine");
    }

    const casino = findCasino(this, casinoName);
    const machine = findMachine(this, casino.name, index);

    if (typeof machine === "undefined") {
      throw new Error("Game machine does not exists");
    } else {
      //machines array of current casino
      const gameMachines = casino.machines;
      //amount to take from deleted machine
      const moneyAmount = machine.getMoney;

      machine.takeMachineMoney(moneyAmount);

      //count from 1
      gameMachines.splice(index - 1, 1);
      //split money among the rest of machines
      for (const machine of gameMachines) {
        try {
          machine.putMoney(Math.round(moneyAmount / casino.getMachineCount));
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }
}
