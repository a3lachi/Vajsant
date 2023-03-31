const ServerFolder = require("../../../model/Folders/ServerFolder.class");

function getAllMediasAvailableForTypeHandler(path) {
    return async (request, reply) => {
        const folder = new ServerFolder({
            folderPath: path
        });
        if(!folder.exists()) {
            folder.create()
        }
        return folder.getFiles();
    }
}

module.exports = getAllMediasAvailableForTypeHandler;