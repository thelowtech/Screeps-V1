var roleHarvest = require('role.harvest');
var roleUpgrade = require('role.upgrade');
var roleBuild = require('role.build');
var roleRepair = require('role.repair');
var creepFunctions = require('creep.functions');
var roomPositionFunctions = require('roomPosition.functions');

module.exports.loop = function() {

    if(Game.time % 20) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvest') {
            roleHarvest.run(creep);
        }
        if(creep.memory.role == 'upgrade') {
            roleUpgrade.run(creep);
        }
        if(creep.memory.role == 'build') {
            roleBuild.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }

    var name = -1;

    var minNumberOfHarvest = 3;
    var minNumberOfBuild = 2;
    var minNumberOfUpgrade = 2;
    var minNumberOfRepair = 1;

    var numberOfHarvest = _.sum(Game.creeps, (c) => c.memory.role == 'harvest');
    var numberOfBuild = _.sum(Game.creeps, (c) => c.memory.role == 'build');
    var numberOfUpgrade = _.sum(Game.creeps, (c) => c.memory.role == 'upgrade');
    var numberOfRepair = _.sum(Game.creeps, (c) => c.memory.role == 'repair');

    if(numberOfHarvest < minNumberOfHarvest) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'harvest', working:false, target: undefined});
    }
    else if(name == -1 && numberOfUpgrade < minNumberOfUpgrade) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'upgrade', working:false, target: undefined});
    }
    else if(name == -1 && numberOfBuild < minNumberOfBuild && creep.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'build', working:false, target: undefined});
    }
    else if(name == -1 && numberOfRepair < minNumberOfRepair) {
        name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'repair', working:false, target: undefined});
    }

    if (!(name < 0)) {
        console.log("Spawned new " + creep.memory.role + " creep: " + name);
    }
}