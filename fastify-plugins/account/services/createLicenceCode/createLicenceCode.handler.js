const Response = require("../../../../model/Response.class");
const createLicenceCode = require("./createLicenceCode");

module.exports = function createAuthentificationHandler(LicencesCodeCollection) {
    return async function (req, reply) {
        const {
            password,
            roles,
        } = req.body;

        const {
            HTTPCode,
            message,
        } = await createLicenceCode(LicencesCodeCollection, password, roles);

        new Response({
            reply,
            code: HTTPCode,
            message
        }).send();
    };
};