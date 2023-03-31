const ServerFile = require("../../../model/Files/ServerFile.class");
const Response = require("../../../model/Response.class");


function deleteMediasHandler(bodyDataParam, mediasFolder) {
    return async (request, reply) => {

        const mediasNames = request.body[bodyDataParam];
        let allFailed = true;
        mediasNames.forEach(
            (mediaName) => {
                const file = new ServerFile({
                    folderPath: mediasFolder,
                    name: mediaName
                });
                if (file.exist()) {
                    allFailed = false;
                    file.delete();
                }
            }
        )
        new Response({
            replyObject: reply,
            description: `Deletion of medias at ${mediasFolder}`,
            code: allFailed ? 404 : 206,
            data: allFailed ? "File(s) not found" : "File(s) deleted"
        }).send()
    }
}

module.exports = deleteMediasHandler;