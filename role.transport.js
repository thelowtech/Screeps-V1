var roleTransport = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.memory.target = undefined;
        }

        if(creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target);
            if(target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.target = undefined;
            }
        }        

        if(creep.memory.target == undefined) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }

            }); 
            if(sources.length) {
                target = sources[0];
                creep.memory.target = sources[0].id;    
            } else {
                return;
            }
        }

        if (creep.memory.working) {
              
            if(creep.pos.isNearTo(target)) {
                creep.transfer(target, RESOURCE_ENERGY)
            } 
            else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
                creep.harvestContainer();
        }    
    }
};

module.exports = roleTransport;