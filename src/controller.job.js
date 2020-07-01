global.ROLES = {
    transport: require('role.transport'),
    carpenter: require('role.carpenter'),
    upgrade: require('role.upgrade'),
    farmer: require('role.farmer'),
    repair: require('role.repair'),
    mine: require('role.mine'),
    wall: require('role.wall'),
}

var jobController = {
    run: function(room) {
        // Grab a creep and run its Job
        console.log['jobController']
        for (var name in Memory.creeps) {
            let creep = Game.creeps[name];
            console.log[name]
            if (!creep) {
                console.log('Clearing non-existing creep memory:', name);
                delete Memory.creeps[name];
            } else {
                ROLES[creep.memory.role].run(creep);
            }
        }
    }

};

module.exports = jobController;
