var roleHarvest = require('role.harvest');
var roleUpgrade = require('role.upgrade');
var roleRepair = require('role.repair');
var roleBuild = require('role.build');
var roleMine = require('role.mine');

var jobController = {
    run: function(room) {
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
            if(creep.memory.role == 'mine') {
                roleMine.run(creep);
            }
        }
    }

};

module.exports = jobController;