var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function() {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    var name = -1;

    var minNumberOfHarvesters = 3;
    var minNumberOfBuilders = 2;
    var minNumberOfUpgraders = 2;

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    if(numberOfHarvesters < minNumberOfHarvesters) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'harvester', working:true});
    }
    else if(name == -1 && numberOfUpgraders < minNumberOfUpgraders) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'upgrader', working:false});
    }
    else if(name == -1 && numberOfBuilders < minNumberOfBuilders) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'builder', working:false});
    }

    if (!(name < 0)) {
        console.log("Spawned new " + creep.memory.role + " creep: " + name);
    }
}