var roleWall = {

    /** @param {Creep} creep  **/
    run: function(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        if(creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target);
            if(target.hits >= target.hitsMax * creep.room.memory.config.wallStep){
                delete creep.memory.target;
            }
        }

        if(!creep.memory.target) {
            for(i = 0.0001; i <= creep.room.memory.config.wallMaxStep; i += 0.0001) {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax * i && 
                                (structure.structureType == STRUCTURE_WALL ||
                                 structure.structureType == STRUCTURE_RAMPART))
                    }

                }); 
                if(sources.length) {
                    target = creep.pos.findClosestByRange(sources)
                    creep.memory.target = target.id;
                    creep.room.memory.config.wallStep = i;
                    break;
                }
            }
        }

        if (creep.memory.working) {            
            if(creep.pos.isNearTo(target) ) {
                creep.repair(target);
                if(target.hits >= target.hitsMax * creep.room.memory.config.wallStep){
                    delete creep.memory.target;
                }
            } else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});                
            }             
        } else {
            creep.collectEnergy();   
        }
    }
};

module.exports = roleWall;