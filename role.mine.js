var roleMine = {

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
            switch(creep.room.memory.config.storage) {
                case "none":
                    target = 0;
                    break;
                case "container":
                    target = getContainer(creep);
                    break;
                case "storage":
                    target = getStorage(creep);
                    break;
            };
        };

        if (creep.memory.working) {
              
            if(creep.pos.isNearTo(target)) {
                creep.transfer(target, RESOURCE_ENERGY)
            } 
            else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
                creep.harvestEnergy();
        }    
    }
};

function getContainer(creep) {
    var sources = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }

    }); 
    if(sources.length) {
        target = sources[0];
        creep.memory.target = sources[0].id;
        return target;
    } else {
        return 0;
    }
};

function getStorage(creep) {
    var sources = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }

    }); 
    if(sources.length) {
        target = sources[0];
        creep.memory.target = sources[0].id;
        return target;
    } else {
        return 0;
    }
};

module.exports = roleMine;