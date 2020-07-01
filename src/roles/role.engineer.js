var roleEngineer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Check state and update
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        // Do work
        if (creep.memory.working) {
            if (creep.pos.isNearTo(creep.room.controller)) {
                creep.upgradeController(creep.room.controller);
            } else {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        } else {
            creep.collectEnergy();
        }
    },

    spawn: function(room) {
        // do we need an engineer
        var spawnCheck = _.filter(Game.creeps, (creep) => creep.memory.role == 'engineer' && creep.room.name == room.name);
        // console.log('Farmers: ' + farmers.length, room.name);

        if (spawnCheck.length < room.memory.census.engineer) {
            return true;
        }
    },

    spawnData: function(room) {
        // this is how we spawn an Engineer
        let name = 'Engineer' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {
            role: 'engineer'
        };

        return {
            name,
            body,
            memory
        };
    }
};

module.exports = roleEngineer;
