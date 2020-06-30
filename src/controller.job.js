global.ROLES = {
    transport: require('role.transport'),
    harvest: require('role.harvest'),
    upgrade: require('role.upgrade'),
    repair: require('role.repair'),
    build: require('role.build'),
    mine: require('role.mine'),
    wall: require('role.wall'),
}

var jobController = {
    run: function(room) {
        // Grab a creep and run its Job
        console.log['jobController']
        for(var name in Memory.creeps) {
            let creep = Game.creeps[name];
            console.log[name]
            if(!creep) {
                console.log('Clearing non-existing creep memory:', name);
                delete Memory.creeps[name];
            } else {
                ROLES[creep.memory.role].run(creep);
            }
        }
    }

};

module.exports = jobController;