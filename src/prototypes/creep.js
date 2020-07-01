// Prototypes added to the creep object

// Used to let roles know where to pickup energy from
// direct from source, containers, or storage
Creep.prototype.collectEnergy = function collectEnergy() {
    switch (this.room.memory.config.storage) {
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

// Find all the energy sources in a room and get all the empty walkable spaces around it
Creep.prototype.findEnergySource = function findEnergySource() {
    let sources = this.room.find(FIND_SOURCES, {
        filter: (source) => {
            return (source.energy > 0);
        }

    });
    if (sources.length) {
        let source = _.find(sources, function(s) {
            return s.pos.getOpenPositions().length > 0;
        });

        if (source) {
            this.memory.source = source.id;
            return source;
        }
    } else {
        return 0;
    }
};

// Harvest Energy Directly from the source
Creep.prototype.harvestEnergy = function harvestEnergy() {
    let storedSource = Game.getObjectById(this.memory.source);
    if (!storedSource || (!storedSource.pos.getOpenPositions().length && !this.pos.isNearTo(storedSource))) {
        delete this.memory.source;
        storedSource = this.findEnergySource();
    }

    if (storedSource) {
        if (this.pos.isNearTo(storedSource)) {
            this.harvest(storedSource);
            if (!storedSource.energy) {
                delete this.memory.source
            }
        } else {
            this.moveTo(storedSource), {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            };
        }
    } else {
        this.memory.working = !this.memory.working;
    }
};

// Find and return a valid container
Creep.prototype.findContainerSource = function findContainerSource() {
    let structures = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        }
    });
    if (structures.length) {
        this.memory.source = structures[0].id;
        return structures[0];
    }
};

// get energy from a container
Creep.prototype.harvestContainer = function harvestContainer() {
    let storedSource = Game.getObjectById(this.memory.source);
    if (!storedSource || !this.pos.isNearTo(storedSource)) {
        delete this.memory.source;
        storedSource = this.findContainerSource();
    }
    if (storedSource) {
        if (this.pos.isNearTo(storedSource)) {
            if (this.withdraw(storedSource, RESOURCE_ENERGY) == -6) {
                delete this.memory.source;
            };

        } else {
            this.moveTo(storedSource), {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            };
        }
    }
};

// find and return a valid storage
Creep.prototype.findStorageSource = function findStorageSource() {
    let structures = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        }
    });
    if (structures.length) {
        // console.log(structures);
        this.memory.source = structures[0].id;
        return structures[0];
    }
};

// get energy from storage
Creep.prototype.harvestStorage = function harvestStorage() {
    let storedSource = Game.getObjectById(this.memory.source);
    if (!storedSource || !this.pos.isNearTo(storedSource)) {
        delete this.memory.source;
        storedSource = this.findStorageSource();
    }
    if (storedSource) {
        if (this.pos.isNearTo(storedSource)) {
            this.withdraw(storedSource, RESOURCE_ENERGY);
            if (storedSource.store.getUsedCapacity(RESOURCE_ENERGY)) {
                delete this.memory.source
            }
        } else {
            this.moveTo(storedSource), {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            };
        }
    }
};


// Used to dropoff excess energy a creep has when no more work is available
Creep.prototype.dropOffEnergy = function dropOffEnergy() {

    // Do we have any extra energy
    if (!this.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        // No Energy Lets Bail Out
        return;
    }

    switch (this.room.memory.config.storage) {
        case "none":
            // No where to drop off
            break;
        case "container":
            // drop in a container
            target = this.findContainerSource()
            break;
        case "storage":
            // drop into a storage container
            target = this.findStorageSource()
            break;
    };

    if (target) {
        if (this.pos.isNearTo(target)) {
            this.transfer(target, RESOURCE_ENERGY);
        } else {
            this.moveTo(target, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
        }
    }

}
