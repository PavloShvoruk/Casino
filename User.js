export class User {
    constructor(name, money) {
        this.name = name;
        this.money = money;
    }

    play(money, casinoName, i) {
        if (this.money === 0) {
            throw "Sorry, you don't have money to play"
        } else if ((this.money - money) < 0) {
            throw "Sorry, you don't have enough money to play"
        } else {
            casinoName.machines[i].play(money);
        }
    }
}