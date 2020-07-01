var roleUpgrade = {

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
    }
};

module.exports = roleUpgrade;
