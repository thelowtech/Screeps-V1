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
    } else {
        return 0;
    }
};

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
    } else {
        this.memory.working = !this.memory.working;
    }
};

Creep.prototype.collectEnergy = function collectEnergy() {
    switch(this.room.memory.config.storage) {
        case "none":
            this.harvestEnergy();
            break;
        case "container":
            this.harvestContainer();
            break;
        case "storage":
            this.harvestStorage();
            break;
    };
};


Creep.prototype.findContainerSource = function findContainerSource() {
    let structures = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        }});
    if (structures.length) {
        // console.log(structures);
        this.memory.source = structures[0].id;
        return structures[0];
    }
};

Creep.prototype.harvestContainer = function harvestContainer() {
    let storedSource = Game.getObjectById(this.memory.source);
    if(!storedSource || !this.pos.isNearTo(storedSource)) {
        delete this.memory.source;
        storedSource = this.findContainerSource();
    }
    if (storedSource) {
        if(this.pos.isNearTo(storedSource)) {
            if(this.withdraw(storedSource, RESOURCE_ENERGY) == -6) {
                delete this.memory.source;
            };
            
        } else {
            this.moveTo(storedSource), {visualizePathStyle: {stroke: '#ffaa00'}};
        }
    }
};

Creep.prototype.findStorageSource = function findStorageSource() {
    let structures = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        }});
    if (structures.length) {
        // console.log(structures);
        this.memory.source = structures[0].id;
        return structures[0];
    }
};

Creep.prototype.harvestStorage = function harvestStorage() {
    let storedSource = Game.getObjectById(this.memory.source);
    if(!storedSource || !this.pos.isNearTo(storedSource)) {
        delete this.memory.source;
        storedSource = this.findStorageSource();
    }
    if (storedSource) {
        if(this.pos.isNearTo(storedSource)) {
            this.withdraw(storedSource, RESOURCE_ENERGY);
            if(storedSource.store.getUsedCapacity(RESOURCE_ENERGY)) {
                delete this.memory.source
            }
        } else {
            this.moveTo(storedSource), {visualizePathStyle: {stroke: '#ffaa00'}};
        }
    }
};