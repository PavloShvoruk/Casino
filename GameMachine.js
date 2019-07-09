export class GameMachine {
    constructor(number) {
        this.number = number;
    }

    get getMoney() {
        return this.number;
    }

    takeMoney(number) {
        if (this.number === 0) {
            throw 'No money on this machine';
        } else if ((this.number -= number) < 0) {
            //TODO: notification that amount to be taken larger
            this.number -= this.getMoney;
        } else {
            this.number -= number;
        }
    }

    putMoney(number) {
        this.number += number;
    }

    play(number) {
        this.number += number;
        let resultArray = [];

        //push three random numbers to array in range between 0 and 10
        for (let i = 0; i < 3; i++) {
            resultArray.push(Math.floor(Math.random() * 10));
        }

        //for test
        // resultArray = [7, 7, 7];
        //count occurence of each number in array 
        const occurence = resultArray.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});

        //iterate through each property in object
        for (const prop in occurence) {
            if (occurence[prop] === 2) {
                console.log("double win");
                //TODO: amount  of money in machine cheker
                this.number -= number * 2;
                return number * 2;
            }
            if (occurence[prop] === 3) {
                console.log("triple win");
                //TODO: amount  of money in machine cheker
                this.number -= number * 3;
                return number * 3;
            }
        }
    }
}