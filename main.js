var roleHarvest = require('role.harvest');
var roleUpgrade = require('role.upgrade');
var roleBuild = require('role.build');
var roleRepair = require('role.repair');
var creepFunctions = require('creep.functions');
var roomPositionFunctions = require('roomPosition.functions');
var defenseTower = require('room.defense');

module.exports.loop = function() {

    if(Game.time % 20) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    _.forEach(Game.rooms, function(room) {
        if(room && room.controller && room.controller.my) {
            // room loop
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
                name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'harvest', working:false, target: undefined});
            }
            else if(name == -1 && numberOfUpgrade < minNumberOfUpgrade) {
                name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'upgrade', working:false, target: undefined});
            }
            else if(name == -1 && numberOfBuild < minNumberOfBuild && room.find(FIND_CONSTRUCTION_SITES).length > 0) {
                name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'build', working:false, target: undefined});
            }
            else if(name == -1 && numberOfRepair < minNumberOfRepair) {
                name=Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined, {role: 'repair', working:false, target: undefined});
            }
        
            if (!(name < 0)) {
                // console.log("Spawned new " + creep.memory.role + " creep: " + name);
            }
        }
    })

    defenseTower.run();

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
}