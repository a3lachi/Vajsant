const Response = require("../../../../model/Response.class");
const editMe = require("./editMe");

module.exports = function editMeHandler(userCollection) {
    return async function (req, reply) {
        const result = await editMe(req, userCollection, req.user._id, req.body);
        new Response({
            reply,
            code: 200,
            data: result,
            message: "Votre profil à bien été mis à jour !",
        }).send();
    };
};