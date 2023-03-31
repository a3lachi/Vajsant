const securePassword = require("secure-password");
const Response = require("../../../../model/Response.class");
const pwd = securePassword();
const replyAuthCookie = require("../hooks/replyAuthCookie");

module.exports =  function signin(fastify, options = {}) {
    const mongoInstalled = fastify.mongo && fastify.mongo.db;
    return async function signinHandler(req, reply) {
        
        const {
            login,
            loginUserAttr = "username",
            password
        } = req.body;

        let data = {};

        const { envLogin, envPassword } = options;

        // Set data depending on the auth used
        data = {
            loginUserAttr
        };

        if(loginUserAttr != "password"){
            data[loginUserAttr] = login;
        }

        // DEBUGGING DATA SENT : 
        // console.log('data : %o', data);

        if(mongoInstalled) {
            const userCollection = mongoInstalled.collection("users");

            // Processing the request
            const users = await userCollection.find(data).toArray();
            
            let found = false;
            let promises = [];
            
            // Checking the result with password encryption
            await users.forEach(
                (usr) => {
                    promises.push(
                        pwd.verify(Buffer.from(password), usr.password.buffer)
                    );
                }
            );
    
            const results = await Promise.all(promises);
            let userIndex = false;
            results.forEach(
                (el, index) => {
                    if (
                        el == securePassword.VALID ||
                        el == securePassword.VALID_NEEDS_REHASH
                    ) {
                        userIndex = index;
                        if (el === securePassword.VALID_NEEDS_REHASH) {
                            req.log.info(
                                {
                                    loginUserAttr
                                },
                                "password needs rehashing"
                            );
                            const hashedPassword = pwd.hash(Buffer.from(password));
                            userCollection.update(
                                {
                                    _id: el._id
                                },
                                {
                                    hashedPassword
                                }
                            );
                        }
                        found = true;
                    }
                }
            );
            
    
            // Handleling the result to the client
            if (
                found
            ){
                const user = users[userIndex];
                const token = await reply.jwtSign({
                    _id: user._id,
                    roles: user.roles.toString()
                });
                
                // DEBUGGING TOKEN
                // console.log("token : %o", token);
    
                replyAuthCookie(reply, token).code(200);
        
                new Response({
                    reply,
                    code: 200,
                    data: token,
                    message: "Connection réussie !"
                }).send();
            } else {
                new Response({
                    reply,
                    code: 400,
                    message: "Nous n'avons pas réussi à vous connecter avec les informations fournies. Veuillez réessayer."
                }).send();
            }
        } else if(envLogin && envPassword){
            if(
                login === envLogin
                && password === envPassword
            ) {
                const token = await reply.jwtSign({
                    _id: 0,
                    login: login,
                    roles: "admin"
                });

                replyAuthCookie(reply, token);
                
                new Response({
                    reply,
                    code: 200,
                    data: token,
                    message: "Connection réussie !"
                }).send();
            } else {
                new Response({
                    reply,
                    code: 400,
                    message: "Nous n'avons pas réussi à vous connecter avec les informations fournies. Veuillez réessayer."
                }).send();
            }
        } else {
            new Response({
                reply,
                code: 400,
                message: "Désolé, aucune authenthification n'a étée trouvée :("
            }).send();
        }
    };
};