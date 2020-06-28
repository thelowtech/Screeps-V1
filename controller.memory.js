var memoryController = {

    /** @param {Room} room */
    run: function(room) {
        // init room memory
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
        if(room.memory.census.wall == undefined) {
            room.memory.census.wall = 0;
        }

        // Config Setup
        if(room.memory.config == undefined) {
            room.memory.config = {};
        }

        if(room.memory.config.storage == undefined) {
            room.memory.config.storage = 'none';
        }

        if(room.memory.config.wallMaxStep == undefined) {
            room.memory.config.wallMaxStep = 0.0001;
        }        

        if(room.memory.config.wallStep == undefined) {
            room.memory.config.wallStep = 0.0001;
        }

        // Check for storage type
        checkStorage(room);
    }
};

function checkStorage(room) {
    let storage = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE)}})
    if(storage.length) {
        room.memory.config.storage = 'storage'
        return;
    }
    let containers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)}})
    if(containers.length) {
        room.memory.config.storage = 'container'
        return;
    }
    room.memory.config = 'none';
}

module.exports = memoryController;