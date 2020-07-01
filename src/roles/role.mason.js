var roleMason = {

    /** @param {Creep} creep  **/
    run: function(creep) {

        // Check State
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        // validate memory target
        if (creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target);
            if (target.hits >= target.hitsMax * creep.room.memory.config.wallTargetSize) {
                delete creep.memory.target;
            }
        }

        // if no target get new target
        if (!creep.memory.target) {

            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL &&
                        structure.hits < structure.hitsMax * creep.room.memory.config.wallTargetSize)
                }
            });

            if (sources.length) {
                target = creep.pos.findClosestByRange(sources)
                creep.memory.target = target.id;
            } else {
                // No Work. Drop off energy
                creep.dropOffEnergy();
            }
        };

        // Do work, move closer, or refill energy
        if (creep.memory.working) {
            if (creep.pos.isNearTo(target)) {
                creep.repair(target);
                if (target.hits >= target.hitsMax * creep.room.memory.config.wallTargetSize) {
                    delete creep.memory.target;
                }
            } else {
                creep.moveTo(target, {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }
        } else {
            creep.collectEnergy();
        }
    },

    spawn: function(room) {
        // do we need a Mason
        var spawnCheck = _.filter(Game.creeps, (creep) => creep.memory.role == 'mason' && creep.room.name == room.name);
        // console.log('Farmers: ' + farmers.length, room.name);
        var sources = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL &&
                    structure.hits < structure.hitsMax * room.memory.config.wallTargetSize)
            }
        });

        if (spawnCheck.length < room.memory.census.mason && sources.length) {
            return true;
        }
    },

    spawnData: function(room) {
        // this is how we spawn a Mason
        let name = 'Mason' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {
            role: 'mason'
        };

        return {
            name,
            body,
            memory
        };
    }
};

module.exports = roleMason;
