const Response = require("../../../../model/Response.class.js");
const validate = require("../../../../validate.js");
const loginSchema = require("../../model/login.schema.js");
const HaveUsersInDB = require("../database/HaveUsersInDB.js");
const getUserFolderPath = require("../getUserFolderPath.js");
const replyAuthCookie = require("../hooks/replyAuthCookie.js");
const signup = require("./signup.js");

function SignupHandler (fastify, usersFolder) {
    const mongoInstalled = fastify.mongo && fastify.mongo.db;
    if(mongoInstalled) {
        const userCollection = mongoInstalled.collection("users");
        const licenceCodeCollection = mongoInstalled.collection("LicencesCodes");
        const licenceCodeEnabled = false;
        
        return async function (req, reply) {
            const {
                licenceCode,
                login,
                loginUserAttr = "username",
                password
            } = req.body;

            //validate("login : ", req.body, loginSchema);

            const userInDB = await HaveUsersInDB(userCollection);
            const licenceCodeExist = licenceCode ? 
                await isLicenceCodeInDb(licenceCodeCollection, licenceCode)
            :
                false
            ;

            if (
                licenceCodeEnabled
                && userInDB 
                && !licenceCodeExist
            ) {
                reply.code(403);
                return {
                    HTTPCode: 403,
                    resultObject: "The Licence Code is incorrect, please check it's spelling",
                };
            } else {
                const {
                    HTTPCode,
                    message,
                    userId,
                    roles
                } = await signup(
                    userCollection,
                    loginUserAttr,
                    login,
                    password,
                    (usersFolder ?
                        (userId) => {
                            new ServerFolder({
                                folderPath: getUserFolderPath({
                                    overrideUserId: userId
                                })
                            }).create();
                        }
                    :
                        false
                    )
                );
                let token;
                if (HTTPCode == 200) {
                    token = await reply.jwtSign({
                        _id: userId,
                        roles: roles
                    });
                    replyAuthCookie(reply, token);
                }

                new Response({
                    reply,
                    code: HTTPCode,
                    message,
                    data: {
                        userId,
                        roles,
                    }
                }).send();
            }
        };
    } else {
        return async (req, reply) => reply.redirect("/config");
    }
}

module.exports = SignupHandler;