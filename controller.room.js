var spawnController = require('controller.spawn');
var jobController = require('controller.job')

var roomController = {

    /** @param {Room} room **/
    run: function(room) {
        spawnController.run(room);
        jobController.run(room);
    }
};

module.exports = roomController;