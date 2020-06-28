var defenseTower = {

    run: function(room) {

        var tower = Game.getObjectById('5ef5dffbcbe5c406c8777aa2');
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
    }
};

module.exports = defenseTower;