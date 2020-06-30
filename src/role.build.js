var roleBuild = {

    /** @param {Creep} creep  **/
    run: function(creep) {

        // Set And Check current working state
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        // If we have a target set make sure it is still a valid target
        if (creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target)
            if (!target) {
                delete creep.memory.target;
            }
        }

        // if there is no target set lets find a construction site to build
        if (!creep.memory.target) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                target = creep.pos.findClosestByRange(targets);
                creep.memory.target = target.id;
            } else {
                creep.dropOffEnergy();
            }
        }

        // Let so some work
        if (creep.memory.working) {
            if (creep.pos.isNearTo(target)) {
                creep.build(target);
            } else {
                creep.moveTo(target, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        } else {
            if (creep.memory.target) {
                creep.collectEnergy();
            }
        }
    }
};

module.exports = roleBuild;
