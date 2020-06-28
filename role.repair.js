var roleRepair = {

    /** @param {Creep} creep  **/
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
                    return (structure.hits < structure.hitsMax)
                }

            }); 
            
            if(sources.length) {
                creep.memory.target = sources[0].id;    
            }
        }
        

        var target = Game.getObjectById(creep.memory.target);

        if (creep.memory.working) {            
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            } 
            if(creep.memory.target !== undefined && target.hits == target.hitsMax) {
                creep.memory.target = undefined
            }
        } else {
            creep.harvestEnergy();   
        }
    }
};

module.exports = roleRepair;