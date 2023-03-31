const Response = require("../../../../model/Response.class");
const getUserById = require("./getUserById");

module.exports = function getConnectedUser(userCollection) {
    return async (req, reply) => {
        if(!req.user) {
            console.error("Route may require auth param to true");
            new Response({
                reply,
                code: 401,
                message: "Aucun utilisateur connecté n'est lié à cette requête.",
            }).send();
        }else {
            const userId = req.user._id;
            const connectedUser = await getUserById(userCollection, userId);
            new Response({
                reply,
                code: 200,
                data: connectedUser,
                message: "Vos informations ont bien étées recupérées !",
            }).send();
        }
    }
};