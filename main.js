var creepFunctions = require('creep.functions');
var roomPositionFunctions = require('roomPosition.functions');
var defenseTower = require('room.defense');
var roomController = require('controller.room');

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
            roomController.run(room);            
        }
    })

    defenseTower.run();

    
}