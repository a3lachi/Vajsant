class Machine {
    constructor({
        name,
        box,

        networkType,
        ip,
        internalNetworkName,
        portForwards,
        
        provisionPath,
        syncedFolder,

        memory,
        cpus
    }) {
        this.name = name;
        this.box = box;

        this.networkType = networkType;
        this.ip = ip;
        this.internalNetworkName = internalNetworkName;
        this.portForwards = portForwards;
        
        this.provisionPath = provisionPath; 
        this.syncedFolder = syncedFolder;

        this.memory = memory;
        this.cpus = cpus;
    }
}

module.exports = Machine;