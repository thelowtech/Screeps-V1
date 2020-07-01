let prototypes = require('prototypes_index');
var roomController = require('controllers_room');

module.exports.loop = function() {



    // check and run each owned room
    _.forEach(Game.rooms, function(room) {
        if (room && room.controller && room.controller.my) {
            roomController.run(room);

        }
    })




}
