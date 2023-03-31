const rootPath = require("../../../rootPath");
const userHasRole = require("./hooks/userHasRole");

function getUserFolderPath({
    request,
    usersDir,
    forceAdmin,
    overrideUserId
}) {
    const isAdmin = request && userHasRole(request, "admin");
    let { _id: userId } = (
        request ?
            request.user
        :
            {}
    );


    if (overrideUserId) {
        userId = overrideUserId;
    }

    const userHomePath = usersDir + userId;
    
    const folderPath = (
        (isAdmin && forceAdmin) ?
            rootPath
        :
            userHomePath
    );

    return folderPath + "/";
}

module.exports = getUserFolderPath;