const ServerFile = require("../../../model/Files/ServerFile.class");

function getFaviconHandler(faviconPath) {
    return async (request, reply) => {
        const projectFaviconFile = new ServerFile({
            filePath: faviconPath
        });
        
        if(projectFaviconFile.exist()) {
            reply.code(200);
            return projectFaviconFile.content;
        }
    }
}

module.exports = getFaviconHandler;