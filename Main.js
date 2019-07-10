import { SuperAdmin } from "./SuperAdmin.js";
import { User } from "./User.js";
import { findCasino } from "./Helpers.js";

const superUser = new SuperAdmin("Pavlo", 10000);
const user = new User("Bob", 10000);

superUser.createCasino("JoyCasino");
superUser.createCasino("777");

//testing createMachine - should return 'You don't have enough money to create this machine' if not enough money
try {
  superUser.createGameMachine("JoyCasino", 1000);
  superUser.createGameMachine("JoyCasino", 1000);
  superUser.createGameMachine("JoyCasino", 1500);
  superUser.createGameMachine("777", 1000);

  console.log(findCasino(superUser, "JoyCasino"));
} catch (error) {
  console.log(error.message);
}

//testing getCasinoMoney
console.log(superUser.getCasinoMoney("JoyCasino", 1500));

//testing addMoney
console.log(superUser.addMoney(1000, 1, "JoyCasino"));

//testing deleteMachine
superUser.deleteMachine(1, "JoyCasino");
console.log(findCasino(superUser, "JoyCasino"));

//testing user play
try {
  user.play(superUser, "JoyCasino", 500);
  user.play(superUser, "JoyCasino", 500);
} catch (error) {
  console.log(error.message);
}

//testing Casino getters
try {
  const casino = findCasino(superUser, "JoyCasino");
  console.log(casino.getMoney);
  console.log(casino.getMachineCount);
} catch (error) {
  console.log(error.message);
}

//testing GameMachine getter
try {
  const machine = findCasino(superUser, "JoyCasino");
  console.log(machine.getMoney);
} catch (error) {
  console.log(error.message);
}
