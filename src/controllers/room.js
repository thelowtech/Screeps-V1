var memoryController = require('controllers_memory');
var spawnController = require('controllers_spawn');
var jobController = require('controllers_job')
var defenseController = require('controllers_defense');

var roomController = {

    /** @param {Room} room **/
    // Get each room and run through each controller
    run: function(room) {
        if (Game.time % 100 == 0) {
            memoryController.run(room);
        }
        spawnController.run(room);
        jobController.run(room);
        defenseController.run(room);
    }
};

module.exports = roomController;
