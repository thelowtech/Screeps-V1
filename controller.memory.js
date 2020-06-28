var memoryController = {

    /** @param {Room} room */
    run: function(room) {
        // init room
        if(!room.memory) {
            console.log('No Memory');
        } 

        // Creeps Setup
        if(room.memory.census == undefined) {
            room.memory.census = {};
        }

        if(room.memory.census.harvest == undefined) {
            room.memory.census.harvest = 2;
        }

        if(room.memory.census.upgrade == undefined) {
            room.memory.census.upgrade = 2;
        }

        if(room.memory.census.build == undefined) {
            room.memory.census.build = 1;
        }

        if(room.memory.census.repair == undefined) {
            room.memory.census.repair = 0;
        }

        if(room.memory.census.mine == undefined) {
            room.memory.census.mine = 0;
        }

        if(room.memory.census.transport == undefined) {
            room.memory.census.transport = 0;
        }

        //Config Setup
        if(room.memory.config == undefined) {
            room.memory.config = {};
        }

        if(room.memory.config.storage == undefined) {
            room.memory.config.storage = 'none';
        }
    }
};

module.exports = memoryController;