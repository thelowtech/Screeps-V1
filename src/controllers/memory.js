var memoryController = {

    /** @param {Room} room */
    run: function(room) {
        // init room memory
        if (!room.memory) {
            console.log('No Memory');
        }

        // Creeps Setup
        if (room.memory.census == undefined) {
            room.memory.census = {};
        }

        if (room.memory.census.farmer == undefined) {
            room.memory.census.farmer = 2;
        }

        if (room.memory.census.engineer == undefined) {
            room.memory.census.engineer = 2;
        }

        if (room.memory.census.carpenter == undefined) {
            room.memory.census.carpenter = 1;
        }

        if (room.memory.census.maintenance == undefined) {
            room.memory.census.maintenance = 0;
        }

        if (room.memory.census.miner == undefined) {
            room.memory.census.miner = 0;
        }

        if (room.memory.census.transporter == undefined) {
            room.memory.census.transporter = 0;
        }

        if (room.memory.census.mason == undefined) {
            room.memory.census.mason = 0;
        }

        // Config Setup
        if (room.memory.config == undefined) {
            room.memory.config = {};
        }

        if (room.memory.config.storage == undefined) {
            room.memory.config.storage = 'none';
        }

        if (room.memory.config.wallTargetSize == undefined) {
            room.memory.config.wallTargetSize = 0.0001;
        }

        // Check for storage type
        checkStorage(room);
    }
};

// Check to see if we are direct, containers, or storage
function checkStorage(room) {
    let storage = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE)
        }
    })
    if (storage.length) {
        room.memory.config.storage = 'storage'
        return;
    }
    let containers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    })
    if (containers.length) {
        room.memory.config.storage = 'container'
        return;
    }
    room.memory.config.storage = 'none';
}

module.exports = memoryController;
