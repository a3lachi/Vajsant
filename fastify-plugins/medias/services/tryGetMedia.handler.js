const ServerFile = require("../../../model/Files/ServerFile.class");
const Response = require("../../../model/Response.class");

function tryGetMediaHandler(
    namespace,
    mediaType,
    folderPathArray,
    extentionsMIMEDictionary
) {
    return async (request, reply) => {
        let reqUrl = request.url;
        const mediaPath = decodeURI(
            reqUrl.replace(namespace, ""),
        );
        let foundMedia;
        folderPathArray.forEach(
            (folderPath) => {
                let filePath = folderPath + mediaPath;
                const mediaFile = new ServerFile({
                    filePath: filePath
                }); 
    
                let extension = mediaFile.extension;
    
                extension = (
                    extentionsMIMEDictionary
                    && extentionsMIMEDictionary[extension] // svg
                ) ?
                    extentionsMIMEDictionary[extension] // "svg+xml"
                :
                    extension
                ;
                reply.type(mediaType + "/" + extension);
            
                if(mediaFile.exist()) {
                    foundMedia = mediaFile;
                    return;
                }
            }
        );
        
        const response = new Response({
            reply: reply,
            description: `Trying to get ${mediaType} : ${mediaPath}`
        })
    
        if (foundMedia) {
            response.code = 200;
            response.data = foundMedia.content;
        } else {
            console.log("%o : %o - not found", mediaType, mediaPath);
            response.code = 404;
            response.data = `${mediaType} : ${mediaPath} - not found`;
        }
    
        response.send();
    }
}

module.exports = tryGetMediaHandler;