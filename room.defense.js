const { forEach } = require("lodash");

var defenseTower = {

    run: function(room) {
        var towers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER)
            }

        });

        _,forEach(towers, function(tower) {
            if(tower) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.hits < structure.hitsMax && 
                                            structure.structureType !== STRUCTURE_WALL && 
                                            (structure.structureType == STRUCTURE_RAMPART &&
                                            structure.hits < structure.hitsMax * room.memory.config.wallMaxStep))
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        })
    }
};

module.exports = defenseTower;