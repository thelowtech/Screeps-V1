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
var spawnController = {

    /** @param {Room} room */
    run: function(room) {

        // Get minimum number of creeps per job
        let minNumberOfTransport = _.get(room.memory, ['census', 'transport'], 1);
        let minNumberOfCarpenter = _.get(room.memory, ['census', 'carpenter'], 1);
        let minNumberOfFarmer = _.get(room.memory, ['census', 'farmer'], 1);
        let minNumberOfUpgrade = _.get(room.memory, ['census', 'upgrade'], 1);
        let minNumberOfRepair = _.get(room.memory, ['census', 'repair'], 1);
        let minNumberOfMine = _.get(room.memory, ['census', 'mine'], 1);
        let minNumberOfWall = _.get(room.memory, ['census', 'wall'], 1);

        // Check how many creeps of each role we have
        var numberOfTransport = _.sum(Game.creeps, (creep) => creep.memory.role == 'transport');
        var numberOfCarpenter = _.sum(Game.creeps, (creep) => creep.memory.role == 'carpenter');
        var numberOfFarmer = _.sum(Game.creeps, (creep) => creep.memory.role == 'farmer');
        var numberOfUpgrade = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrade');
        var numberOfRepair = _.sum(Game.creeps, (creep) => creep.memory.role == 'repair');
        var numberOfMine = _.sum(Game.creeps, (creep) => creep.memory.role == 'mine');
        var numberOfWall = _.sum(Game.creeps, (creep) => creep.memory.role == 'wall');

        // Check to see if we need more creeps of each job
        var name = -1;
        if (!numberOfFarmer && (!numberOfMine || !numberOfTransport)) {
            name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {
                role: 'farmer',
                working: false,
                target: undefined
            });
        }

        if (name == -1 && numberOfFarmer < minNumberOfFarmer) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'farmer',
                working: false,
                target: undefined
            });
            // if(false){
            //     // pass

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
        } else if (name == -1 && numberOfUpgrade < minNumberOfUpgrade) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'upgrade',
                working: false,
                target: undefined
            });
        } else if (name == -1 && numberOfCarpenter < minNumberOfCarpenter && room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'carpenter',
                working: false,
                target: undefined
            });
        } else if (name == -1 && numberOfRepair < minNumberOfRepair) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'repair',
                working: false,
                target: undefined
            });
        } else if (name == -1 && numberOfWall < minNumberOfWall) {
            name = Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room), undefined, {
                role: 'wall',
                working: false,
                target: undefined
            });
        }

        if (!(name < 0)) {
            // console.log("Spawned new " + creep.memory.role + " creep: " + name);
        }
    }
};

module.exports = spawnController;
