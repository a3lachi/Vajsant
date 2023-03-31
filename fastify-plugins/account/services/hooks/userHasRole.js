/**
 * 
 * @param {*} req 
 * @param {string} role 
 * @returns True or false
 */
function userHasRole(req, role) {
    return !!(req.user &&
        req.user.roles != undefined &&
        req.user.roles.split &&
        req.user.roles.split(",").includes(role)
    );
}

module.exports = userHasRole;