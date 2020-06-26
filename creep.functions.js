Creep.prototype.findEnergySource = function findEnergySource() {
    let sources = this.room.find(FIND_SOURCES, {
        filter: (source) => {
            return (source.energy > 0);
        }

    });
    if(sources.length){
        let source = _.find(sources, function(s){
            // console.log(s.pos, s.pos.getOpenPositions())
            return s.pos.getOpenPositions().length > 0;
        });

        // console.log(sources.length, Source);
        if(source) {
            this.memory.source = source.id;
            return source;
        }
    }
}

Creep.prototype.harvestEnergy = function harvestEnergy() {
    let storedSource = Game.getObjectById(this.memory.source);
    if(!storedSource || (!storedSource.pos.getOpenPositions().length && !this.pos.isNearTo(storedSource))) {
        delete this.memory.source;
        storedSource = this.findEnergySource();
    }
    if (storedSource) {
        if(this.pos.isNearTo(storedSource)) {
            this.harvest(storedSource);
            if(!storedSource.energy) {
                delete this.memory.source
            }
        } else {
            this.moveTo(storedSource), {visualizePathStyle: {stroke: '#ffaa00'}};
        }
    }
}