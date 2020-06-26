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
    run: function(room){
        let minNumberOfHarvest = _.get(room.memory, ['cencus', 'harvest'], 1);
        let minNumberOfBuild = _.get(room.memory, ['cencus', 'build'], 1);
        let minNumberOfUpgrade = _.get(room.memory, ['cencus', 'upgrade'], 1);
        let minNumberOfRepair = _.get(room.memory, ['cencus', 'repair'], 1);

        var numberOfHarvest = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvest');
        var numberOfBuild = _.sum(Game.creeps, (creep) => creep.memory.role == 'build');
        var numberOfUpgrade = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrade');
        var numberOfRepair = _.sum(Game.creeps, (creep) => creep.memory.role == 'repair');

        var name = -1;

        if(numberOfHarvest < minNumberOfHarvest) {
            name=Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room),undefined, {role: 'harvest', working:false, target: undefined});
        }
        else if(name == -1 && numberOfUpgrade < minNumberOfUpgrade) {
            name=Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room),undefined, {role: 'upgrade', working:false, target: undefined});
        }
        else if(name == -1 && numberOfBuild < minNumberOfBuild && room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            name=Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room),undefined, {role: 'build', working:false, target: undefined});
        }
        else if(name == -1 && numberOfRepair < minNumberOfRepair) {
            name=Game.spawns.Spawn1.createCreep(getBody([WORK, CARRY, MOVE], room),undefined, {role: 'repair', working:false, target: undefined});
        }
    
        if (!(name < 0)) {
             // console.log("Spawned new " + creep.memory.role + " creep: " + name);
        }
    }    
};

module.exports = spawnController;