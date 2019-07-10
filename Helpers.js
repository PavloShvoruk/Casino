export function findCasino(user, casinoName) {
    let result = user.casinos.find(function (casino) {
        return casino.name === casinoName;
    })

    if (typeof (result) === "undefined") {
        throw new Error("This super admin does not have casino with such name");
    } else {
        return result;
    }
}

export function findMachine(user, casinoName, machineNumber) {
    const casino = findCasino(user, casinoName);

    let result = casino.machines[machineNumber - 1];

    if (typeof (result) === "undefined") {
        throw new Error("This casino does not have such game machine");
    } else {
        return result;
    }
}