var spawnController = require('controller.spawn');
var jobController = require('controller.job')
var memoryController = require('controller.memory');

var roomController = {

    /** @param {Room} room **/
    run: function(room) {
        if(Game.time % 10) {
            memoryController.run(room);
        }
        spawnController.run(room);
        jobController.run(room);
    }
};

module.exports = roomController;