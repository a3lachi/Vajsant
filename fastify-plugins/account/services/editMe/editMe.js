const UserSchema = require("../../model/User/User.schema");
const editDocument = require("../../../mongo/services/editDocument");

module.exports = async function editMe(
    request,
    userCollection,
    userId,
    postbody,
){
    editDocument({
        request,
        collection: userCollection,
        documentID: userId,
        postbody,
        keysSchemas: UserSchema,
        cantEditKeys: ["_id", "password"],
        needRoleKeyMap: {
            "roles": "admin"
        }
    });
    
    // const updateFilter = {_id: ObjectId(userId)};
    // let updateAction = { $set : {}};

    // Object.keys(postbody).forEach(
    //     (key) => {
    //         const value = postbody[key];
    //         if(key != "_id" && key != "password") {
    //             if(key == "authAttr") {
    //                 if (
    //                     Object.keys(
    //                         UserSchema.properties
    //                     ).includes(value)
    //                 ) {
    //                     updateAction.$set[key] = value;
    //                 }
    //             }else if (key == "roles") {
    //                 if(isAdmin) {
    //                     const newRoles = Array.isArray(value) ?
    //                         value
    //                     :
    //                         typeof value && value.split(",")
    //                     ;
    //                     updateAction.$set[key] = newRoles;
    //                 }
    //             } else {
    //                 updateAction.$set[key] = value;
    //             }
    //         }
    //     }
    // );

    // const res = await userCollection.updateOne(
    //     updateFilter,
    //     updateAction
    // );
    // return res;
};