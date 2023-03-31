
const ServerFile = require("../../../model/Files/ServerFile.class");
const Response = require("../../../model/Response.class");

function addMediasHandler(folderPath) {
    return async (request, reply) => {
        
        const files = request.raw.files;
        let fileArr = [];
        for(let key in files){
            const fileName = Buffer.from(
                files[key].name,
                'latin1'
            ).toString(
                'utf8',
            );
            new ServerFile({
                folderPath: folderPath,
                name: fileName,
                content: files[key].data
            }).create();
            fileArr.push({
                name: fileName,
                mimetype: files[key].mimetype,
            });
        }
        new Response({
            reply: reply,
            code: 200,
            data: fileArr,
            message: `Image-s ajoutée-s avec succès !`
        }).send(fileArr);
    }
}

module.exports = addMediasHandler;