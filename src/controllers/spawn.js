let creepRoles = require('roles_index');
let creepTypes = _.keys(creepRoles);

var spawnController = {

    /** @param {Room} room */
    run: function(room) {

        // find a creep type that returns true for the .spawn() function
        let creepTypeNeeded = _.find(creepTypes, function(type) {
            return creepRoles[type].spawn(room);
        });

        // get the data for spawning a new creep of creepTypeNeeded
        let creepSpawnData = creepRoles[creepTypeNeeded] && creepRoles[creepTypeNeeded].spawnData(room);

        if (creepSpawnData) {
            // find the first or 0th spawn in the room
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            creepSpawnData.body = getBody(creepSpawnData.body, room)
            let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {
                memory: creepSpawnData.memory
            });
            if (result == 0) {
                console.log("Spawned: " + creepSpawnData.name)
            }
        }

        // Old Spawn Code

        // Get minimum number of creeps per job
        let minNumberOfTransport = _.get(room.memory, ['census', 'transport'], 1);
        // let minNumberOfCarpenter = _.get(room.memory, ['census', 'carpenter'], 1);
        // let minNumberOfFarmer = _.get(room.memory, ['census', 'farmer'], 1);
        // let minNumberOfUpgrade = _.get(room.memory, ['census', 'upgrade'], 1);
        let minNumberOfRepair = _.get(room.memory, ['census', 'repair'], 1);
        let minNumberOfMine = _.get(room.memory, ['census', 'mine'], 1);
        let minNumberOfMason = _.get(room.memory, ['census', 'mason'], 1);

        // Check how many creeps of each role we have
        var numberOfTransport = _.sum(Game.creeps, (creep) => creep.memory.role == 'transport');
        // var numberOfCarpenter = _.sum(Game.creeps, (creep) => creep.memory.role == 'carpenter');
        // var numberOfFarmer = _.sum(Game.creeps, (creep) => creep.memory.role == 'farmer');
        // var numberOfUpgrade = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrade');
        var numberOfRepair = _.sum(Game.creeps, (creep) => creep.memory.role == 'repair');
        var numberOfMine = _.sum(Game.creeps, (creep) => creep.memory.role == 'mine');
        var numberOfMason = _.sum(Game.creeps, (creep) => creep.memory.role == 'mason');

        // Check to see if we need more creeps of each job
        var name = -1;
        // if (!numberOfFarmer && (!numberOfMine || !numberOfTransport)) {
        //     name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {
        //         role: 'farmer',
        //         working: false,
        //         target: undefined
        //     });
        // }

        // if (name == -1 && numberOfFarmer < minNumberOfFarmer) {
        //     name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
        //         role: 'farmer',
        //         working: false,
        //         target: undefined
        //     });
        if (false) {
            // pass

        } else if (name == -1 && numberOfMine < minNumberOfMine) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'mine',
                working: false,
                target: undefined
            });
        } else if (name == -1 && numberOfTransport < minNumberOfTransport) {
            name = Game.spawns.Spawn1.createCreep(getBody([CARRY, CARRY, MOVE], room), undefined, {
                role: 'transport',
                working: false,
                target: undefined
            });
        }
        // else if (name == -1 && numberOfUpgrade < minNumberOfUpgrade) {
        //     name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
        //         role: 'upgrade',
        //         working: false,
        //         target: undefined
        //     });
        // } 
        // else if (name == -1 && numberOfCarpenter < minNumberOfCarpenter && room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        //     name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
        //         role: 'carpenter',
        //         working: false,
        //         target: undefined
        //     });
        // } 
        else if (name == -1 && numberOfRepair < minNumberOfRepair) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'repair',
                working: false,
                target: undefined
            });
        } else if (name == -1 && numberOfMason < minNumberOfMason) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'mason',
                working: false,
                target: undefined
            });
        }

        if (!(name < 0)) {
            // console.log("Spawned new " + creep.memory.role + " creep: " + name);
        }
    }
};

function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyCapacityAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function() {
        _.forEach(segment, s => body.push(s));
    });

    return body;
};

module.exports = spawnController;
