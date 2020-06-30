var memoryController = require('controller.memory');
var spawnController = require('controller.spawn');
var jobController = require('controller.job')
var defenseTower = require('room.defense');

var roomController = {

    /** @param {Room} room **/
    // Get each room and run through each controller
    run: function(room) {
        if (Game.time % 100 == 0) {
            memoryController.run(room);
        }
        spawnController.run(room);
        jobController.run(room);
        defenseTower.run(room);
    }
};

module.exports = roomController;
