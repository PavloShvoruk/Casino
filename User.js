import { findCasino, findMachine } from "./Helpers.js";
export class User {
  constructor(name, money) {
    this.name = name;
    this.money = money;
  }

  play(casinoOwner, casinoName, money) {
    if (money === 0 || isNaN(money)) {
      throw new Error("Not valid bet!");
    }
    if (this.money - money < 0) {
      throw new Error("You don't have enough money to bet!");
    } else {
      try {
        let casino = findCasino(casinoOwner, casinoName);
        //random choose of machine
        let randomMachineNumber =
          Math.floor(Math.random() * casino.getMachineCount) + 1;
        let machine = findMachine(casinoOwner, casinoName, randomMachineNumber);
        this.money -= money;
        this.money += machine.play(money);
      } catch (error) {
        console.log(error.message);
        this.money += money;
      }
    }
  }
}
