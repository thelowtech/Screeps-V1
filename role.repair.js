var roleRepair = {

    /** @param {Creep} creep  **/
    run: function(creep) {

        // Check state and update
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
            creep.memory.target = undefined; 
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.memory.target = undefined;
        }

        // If we have a target set make sure it is still a valid target
        if(creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target)
            if(!target) {
                delete creep.memory.target;
            }
        }

        // If no memory set find a new target
        if(creep.memory.target == undefined) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax &&
                            structure.structureType !== STRUCTURE_RAMPART &&
                            structure.structureType !== STRUCTURE_WALL)
                }

            }); 
            
            if(sources.length) {
                creep.memory.target = sources[0].id;    
            }
        }
        
        // Do Work
        if (creep.memory.working) {        
            if(creep.pos.isNearTo(target)) {
                creep.repair(target);
                if(creep.memory.target !== undefined && target.hits == target.hitsMax) {
                    creep.memory.target = undefined
                }
            } else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            } 
        } else {
            creep.collectEnergy();   
        }
    }
};

module.exports = roleRepair;