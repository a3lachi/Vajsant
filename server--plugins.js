const path = require("path");
const UserAttributesSchema = require("./model/User/UserAttributes.schema");
const rootPath = require("./rootPath");

async function applyPlugins (fastify) {
    fastify.register(require('@fastify/swagger'))

    fastify.register(
        require('@fastify/swagger-ui'), {
            routePrefix: '/',
            uiConfig: {
                docExpansion: 'none',
                deepLinking: false
            },
            uiHooks: {
                onRequest: function (request, reply, next) { next() },
                preHandler: function (request, reply, next) { next() }
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
            transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
            transformSpecificationClone: true
        }
    )

    fastify.register(
        require("@fastify/mongodb"), {
            url: "mongodb://127.0.0.1:27017/hexarange",
            name: "cerebro"
        }
    );

    fastify.after(
        (err) => {
            if(err) {
                console.log("err : %o", err);
                console.log(
                    "ERROR - fastify-mongodb : You may have forgotten to install MongoDB, give it a try ! :)\n" +
                    "If already installed, the MongoDB process might be dead / offline, or the url connexion string is incorrect"
                );
                return;
            } else {
                const mongoInstalled = fastify.mongo && fastify.mongo.db;
                const userCollection = mongoInstalled.collection("users");
                let constraint = {
                    username: 1,
                };
                
                userCollection.createIndex(
                    constraint, {
                        unique: true
                    }
                );
            }
        }
    );



    fastify.register(
        require("@fastify/cors"), {
            origin: "*",
            methods: ["POST", "PUT", "DELETE", "OPTIONS", "GET"]
        }
    );


    fastify.register(
        require("@fastify/formbody")
    );

    fastify.register(
        require("fastify-file-upload")
    );

    fastify.register(
        require("@fastify/cookie")
    );
    
    fastify.register(
        require("@fastify/session"), {
            cookieName: 'shopshop-cookie',
            secret: 'a secret with minimum length of 32 characters',
            cookie: { secure: false },
            expires: 1800000
        }
    );


    // Your plugins
    fastify.register(
        require("./fastify-plugins/mongo/plugin")
    );

    fastify.register(
        require("./fastify-plugins/account/plugin"), {
            envLogin: "admin",
            envPassword: "admin",
            userAdditionnalAttributes: UserAttributesSchema.properties,
        }
    );

    fastify.register(
        require("./fastify-plugins/medias/plugin"), [
            {
                namespace: "images",
                mediaName: "image",
                folderPath: rootPath + "/assets/images",
                extentionsMIMEDictionary: {
                    "svg": "svg+xml"
                }
            }
        ]
    )

    fastify.register(
        require("./fastify-plugins/vagrant/plugin")
    );


    
    // ------------------------------------------------------------------------------------------------------------------------------------------------------
    fastify.register(
        require("./fastify-plugins/experim/plugin")
    );
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    //fastify.register(
    //    require("../code_source/fastify-plugins/model_schema_connector")
    //);
    
    /*
    fastify.setNotFoundHandler(
        (request, reply) => {
            reply.send(
                `<html>
                    <head></head>
                    <body>
                        <h1>404 NOT FOUND</h1>
                    </body>
                </html>`
            );
        }
    );
    */
   /*pug(
        "./404.pug",
        {
            server: fastify.server.address(),
        }
    );*/

    // Decorators
    fastify.register(
        require("@fastify/autoload"),
        {
            dir: path.join(rootPath, "/fastify-plugins/decorators"),
        }
    );
    
    // Hooks
    
    
    // Services
    fastify.after(
        (err) => {
            fastify.register(
                require("@fastify/autoload"),
                {
                    dir: path.join(rootPath, "/fastify-plugins/services"),
                    // ignorePattern: "jwt.js"
                }
            );
        }
    );
}

module.exports = applyPlugins;