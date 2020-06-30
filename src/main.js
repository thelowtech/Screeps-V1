var creepFunctions = require('creep.functions');
var roomPositionFunctions = require('roomPosition.functions');
var roomController = require('controller.room');

module.exports.loop = function() {



    // check and run each owned room
    _.forEach(Game.rooms, function(room) {
        if(room && room.controller && room.controller.my) {
            roomController.run(room);    
                   
        }
    })

    

    
}