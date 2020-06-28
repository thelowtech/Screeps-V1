var memoryController = require('controller.memory');
var spawnController = require('controller.spawn');
var jobController = require('controller.job')
var defenseTower = require('room.defense');

var roomController = {

    /** @param {Room} room **/
    run: function(room) {
        if(Game.time % 100) {
            memoryController.run(room);
        }
        spawnController.run(room);
        jobController.run(room);
        defenseTower.run(room); 
    }
};

module.exports = roomController;