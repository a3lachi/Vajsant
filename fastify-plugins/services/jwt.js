// https://github.com/fastify/fastify-plugin
const fastifyPlugin = require("fastify-plugin");

const JWT = require(
    "@fastify/jwt", 
    {
        cookie: {
            cookieName: "shopshop-cookie"
        }
    }
);


/**
 * Le plugin JWT qui permet de s'authentifier en utilisant des Javascript Web Token 
 * @param {*} fastify Le server auquel on veut s'enregistrer
 * @param {*} options les options d'authentifications (Bearer par ex.)
 */
async function jwt(fastify, options, next) {
    
    fastify.register(
        JWT,
        Object.assign(
            {},
            {
                secret: "AVerySecretSecret",
                cookie: {
                    cookieName: "shopshop-cookie"
                }
            },
            options.auth
        )
    );
    
    // fastify.decorate(
    //     "authenticate",
    //     async function(request, reply) {
    //         try {
    //             await request.jwtVerify();
    //         } catch (error) {
    //             reply.code(401);
    //             reply.pug(
    //                 httpErrorCodePagesDir + "401.pug",
    //                 {
    //                     server: fastify.server.address(),
    //                 }
    //             );
    //         }
    //     }
    // );
    next();
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.

// Envelopper un plugin dans la function fastify-plugin permet au contexte parent
// d'avoir accèss aux hooks et decorateur présents dans le plugin passé en paramètre
module.exports = fastifyPlugin(jwt);