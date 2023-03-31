const { ObjectId } = require("@fastify/mongodb");

async function getDocumentById(collection, id, reply) {
    const result = await collection.findOne({
        _id: ObjectId(id)
    });
    if (result === null) {
        if(reply) {
            reply.code(404);
            reply.send("Invalid id : Document not found");
        }
    } else {
        return result;
    }
}

module.exports = getDocumentById;