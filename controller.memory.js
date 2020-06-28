var memoryController = {

    /** @param {Room} room */
    run: function(room) {
        // init room
        if(!room.memory) {
            console.log('No Memory');
        } 

        // Creeps Setup
        if(!room.memory.census) {
            room.memory.census = {};
        }

        if(!room.memory.census.harvest) {
            room.memory.census.harvest = 2;
        }

        if(!room.memory.census.upgrade) {
            room.memory.census.upgrade = 2;
        }

        if(!room.memory.census.build) {
            room.memory.census.build = 1;
        }

        if(!room.memory.census.repair) {
            room.memory.census.repair = 0;
        }

        if(!room.memory.census.mine) {
            room.memory.census.mine = 0;
        }

        if(!room.memory.census.transport) {
            room.memory.census.transport = 0;
        }

        //Config Setup
        if(!room.memory.config) {
            room.memory.config = {};
        }

        if(!room.memory.config.storage) {
            room.memory.config.storage = 'none';
        }
    }
};

module.exports = memoryController;