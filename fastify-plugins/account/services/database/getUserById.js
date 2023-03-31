const { ObjectId } = require("@fastify/mongodb");

async function getUserById(userCollection, id, reply) {
    const result = await userCollection.findOne({
        _id: ObjectId(id)
    });
    if (result === null) {
        if(reply) {
            reply.code(404);
            reply.send("Invalid id : User not found");
        }
    } else {
        return result;
    }
}

module.exports = getUserById;