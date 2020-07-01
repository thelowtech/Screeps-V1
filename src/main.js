let controllers = require('controllers_index');
let prototypes = require('prototypes_index');
let creepRoles = require('roles_index')

module.exports.loop = function() {

    // check and run each owned room
    _.forEach(Game.rooms, function(room) {
        if (room && room.controller && room.controller.my) {
            if (Game.time % 100 == 0) {
                controllers['memory'].run(room);
            }
            controllers['spawn'].run(room);
            controllers['job'].run(room);
            controllers['defense'].run(room);
        }
    })




}
