const { ObjectId } = require("@fastify/mongodb");

async function deleteDocument(collection, id, onDelete = false){
    const updateFilter = { _id: ObjectId(id) };
    
    const res = await collection.deleteOne(
        updateFilter
    );

    if(onDelete) {
        onDelete();
    }
    console.log("zzzzz");
    return res;
};

module.exports = deleteDocument;