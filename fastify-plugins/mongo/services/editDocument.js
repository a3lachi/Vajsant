const { ObjectId } = require("@fastify/mongodb");
const userHasRole = require("../../account/services/hooks/userHasRole");

async function editDocument({
    request,
    collection,
    documentID,
    postbody,
    keysSchemas = {},
    cantEditKeys = ["_id"],
    needRoleKeyMap = {}
}){
    const updateFilter = {_id: ObjectId(documentID)};
    let updateAction = { $set : {}};

    Object.keys(postbody).forEach(
        (key) => {
            const value = postbody[key];

            if(!cantEditKeys.includes(key)) {
                if(Object.keys(keysSchemas).includes(key)) {
                    if (
                        Object.keys(
                            keysSchemas.properties
                        ).includes(value)
                    ) {
                        updateAction.$set[key] = value;
                    }
                }else if (Object.keys(needRoleKeyMap).includes(key)) {
                    if(
                        userHasRole(
                            request,
                            needRoleKeyMap[key]
                        )
                    ) {
                        updateAction.$set[key] = value;
                    }
                } else {
                    updateAction.$set[key] = value;
                }
            }
        }
    );

    const res = await collection.updateOne(
        updateFilter,
        updateAction
    );
    
    return res;
}

module.exports = editDocument;