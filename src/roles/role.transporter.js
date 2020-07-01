var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // check state and update
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.memory.target = undefined;
        }

        // Check for a valid memory target
        if (creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target);
            if (target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.target = undefined;
            }
        }

        // If no memory target set find a new one
        if (creep.memory.target == undefined) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN) &&
                        (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (!sources.length) {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
            }
            if (!sources.length) {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
            }

            if (sources.length) {
                target = creep.pos.findClosestByRange(sources);
                creep.memory.target = target.id;
            } else {
                return;
            }
        }

        // Do Work
        if (creep.memory.working) {

            if (creep.pos.isNearTo(target)) {
                creep.transfer(target, RESOURCE_ENERGY)
            } else {
                creep.moveTo(target, {
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
        // do we need a transporter
        var spawnCheck = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.room.name == room.name);

        if (spawnCheck.length < room.memory.census.transporter) {
            return true;
        }
    },

    spawnData: function(room) {
        // this is how we spawn a transporter
        let name = 'Transporter' + Game.time;
        let body = [CARRY, CARRY, MOVE];
        let memory = {
            role: 'transporter'
        };

        return {
            name,
            body,
            memory
        };
    }
};

module.exports = roleTransporter;
