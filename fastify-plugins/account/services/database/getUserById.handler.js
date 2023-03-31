const getUserById = require("./getUserById");

function getUserByIdHandler(userCollection) {
    return async (request, reply) => {
        return await getUserById(userCollection, request.params.id, reply);
    };
}

module.exports = getUserByIdHandler;