export class GameMachine {
  constructor(number) {
    this.number = number;
  }

  get getMoney() {
    return this.number;
  }

  takeMachineMoney(number) {
    if (this.number - number >= 0) {
      this.number -= number;
    } else {
      throw new Error("Not enough money on this machine.");
    }
  }

  putMoney(number) {
    if (isNaN(number)) {
      throw new Error("Cannot put such amount to machine");
    } else {
      this.number += number;
    }
  }

  play(number) {
    if (isNaN(number)) {
      throw new Error("Cannot put such amount to machine");
    } else if (this.number - number < 0) {
      throw new Error(
        "Machine does not have enough money to play. Please contact admin!"
      );
    } else {
      this.number += number;
    }
    let resultArray = [];

    //push three random numbers to array in range between 0 and 10
    for (let i = 0; i < 3; i++) {
      resultArray.push(Math.floor(Math.random() * 10));
    }
    console.log(resultArray);
    //for test
    // resultArray = [7, 7, 7];
    //count occurence of each number in resultArray
    const occurence = resultArray.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});

    //iterate through each property in object
    for (const prop in occurence) {
      if (occurence[prop] === 2) {
        console.log("double win");
        //TODO: amount  of money in machine cheker
        this.takeMachineMoney(number * 2);
        return number * 2;
      }
      if (occurence[prop] === 3) {
        console.log("triple win");
        //TODO: amount  of money in machine cheker
        this.takeMachineMoney(number * 3);
        return number * 3;
      } else {
        return 0;
      }
    }
  }
}
