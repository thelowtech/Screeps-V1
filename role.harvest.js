var roleHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
            creep.memory.target = undefined; 
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.memory.target = undefined;
        }

        if(creep.memory.target == undefined) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }

            }); 
            if(sources.length) {
                creep.memory.target = sources[0].id;    
            }
        }

        var target = Game.getObjectById(creep.memory.target);
        if (!creep.memory.working) {
            creep.harvestEnergy();
        } else {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                // console.log(creep.name + " Is Not in Range of the Energy Source")
                }
            if (target != null && target.getFreeCapacity == 0) {
                creep.memory.target = undefined;
            }
        }
    }
};

module.exports = roleHarvest;