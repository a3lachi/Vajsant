const Route = require("../../../model/route.class");
const addMediasHandler = require("./addMedias.handler");
const deleteMediasHandler = require("./deleteMedias.handler");
const getAllMediasAvailableForTypeHandler = require("./getAllMediasAvailableForType.handler");
const tryGetMediaHandler = require("./tryGetMedia.handler");

function getMediasRoutes({
    namespace,
    mediaName,
    folderPath,
    extentionsMIMEDictionary
}) {
    return [
        new Route({
            method: "GET",
            path: "/" + namespace,
            handler: getAllMediasAvailableForTypeHandler(folderPath),
            schema: {
                description: `Retourne la liste des ${mediaName}s disponibles`,
                summary: `Retourne la liste des ${mediaName}s disponibles`,
                tags: ["medias"],
            }
        }),

        new Route({
            method: "DELETE",
            path: "/" + namespace,
            handler: deleteMediasHandler(mediaName + "s", folderPath),
            schema: {
                description: `Suprime la ou les ${mediaName}s demandées`,
                summary: `Suprime la ou les ${mediaName}s demandées`,
                tags: ["medias"],
                body: {
                    $id: `${mediaName}Array`,
                    title: `${mediaName}Array`,
                    properties: {
                        [mediaName]: { type: "object" },
                    },
                    required: [`${mediaName}`]
                }
            },
        }),

        new Route({
            method: "POST",
            path: "/" + namespace,
            handler: addMediasHandler(folderPath),
            schema: {
                description: `Ajoute le-s ${mediaName}-s demandée-s`,
                summary: `Ajoute le-s ${mediaName}-s demandée-s`,
                tags: ["medias"],
            },
            restrictedToRoles: ["admin"]
        }),

        new Route({
            method: "GET",
            path: "/" + namespace + "/*",
            handler: tryGetMediaHandler(
                namespace,
                mediaName,
                [folderPath],
                extentionsMIMEDictionary
            ),
            schema: {
                description: `Retourne le-a ${mediaName} demandé-e`,
                summary: `Retourne le-a ${mediaName} demandé-e`,
                tags: ["medias"],
            }
        }),
    ]
}

module.exports = getMediasRoutes;