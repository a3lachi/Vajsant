const disconnect = require("../disconnect/disconnect");
const Response = require("../../../../model/Response.class");
const deleteDocument = require("../../../mongo/services/deleteDocument");

module.exports = function deleteMeHandler(userCollection) {
    return async function (req, reply) {
        disconnect(req, reply);
        const result = await deleteDocument(userCollection, req.user._id);
        new Response({
            reply,
            code: 200,
            data: result,
            message: "Votre profil a bien été supprimé."
        }).send();
    };
};