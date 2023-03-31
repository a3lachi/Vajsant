
// # Fastify Route

const userHasRole = require("../fastify-plugins/account/services/hooks/userHasRole");
const Response = require("./Response.class");

// For more info, see [https://www.fastify.io/docs/master/Routes/](https://www.fastify.io/docs/master/Routes/)
class Route {
    constructor(
        {
            name,
            method,
            path,
            handler,
            description,
            schema,
            keywords = [],
            namespace = "",
            preValidation,
            auth = false,
            server,
            restrictedToRoles = []
        }
    ) {
        this.name = name;
        this.method = method;
        this.path = path;
        this.handler = handler;
        this.description = description;
        this.schema = schema;
        this.keywords = keywords;
        this.namespace = namespace;
        this.preValidation = preValidation;
        this.auth = !!(auth || restrictedToRoles.length > 0);
        this.server = server;
        this.restrictedToRoles = restrictedToRoles;
        
        this.checkAuth();
    }

    // Uncomment if used
    /* istanbul ignore next */
    prefixPathWith (prefix) {
        this.path = prefix + this.path;
        return this;
    }

    checkAuth() {
        if (this.auth) {
            // 401 vs 403 : https://stackoverflow.com/a/6937030
            this.preValidation = async (request, reply) => {
                if(request.jwtVerify) {
                    try {
                        await request.jwtVerify();
                        if(this.restrictedToRoles.length > 0){
                            let canSee = false;
                            this.restrictedToRoles.forEach(
                                (role) => {
                                    canSee = userHasRole(request, role) ? true : canSee;
                                }
                            );
                            if (!canSee) {
                                reply.code(403);
                                reply.send("FORBIDDEN : You do not have the rights to see this page !");
                            }
                        }
                    } catch (error) {
                        console.log("Error : %o", error);
                        new Response({
                            reply,
                            code: 401,
                            message: "Vous devez être connecté-e pour faire cela !"
                        }).send()
                    }
                }
            };
        }
    }
}

module.exports = Route;