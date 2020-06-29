var creepFunctions = require('creep.functions');
var roomPositionFunctions = require('roomPosition.functions');
var roomController = require('controller.room');

module.exports.loop = function() {

    // Check and remove dead creeps from memory
    if(Game.time % 20 == 0) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    // check and run each owned room
    _.forEach(Game.rooms, function(room) {
        if(room && room.controller && room.controller.my) {
            roomController.run(room);    
                   
        }
    })

    

    
}