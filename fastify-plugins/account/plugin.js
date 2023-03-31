const fastifyPlugin = require("fastify-plugin");
const Response = require("../../model/Response.class");
const Route = require("../../model/route.class");
const LicenceCodeFormSchema = require("./model/LicenceCode/LicenceCodeForm.schema");
const LoginSchema = require("./model/login.schema");
const loginSchema = require("./model/login.schema");
const UserSchema = require("./model/User/User.schema");
const createLicenceCodeHandler = require("./services/createLicenceCode/createLicenceCode.handler");
const getConnectedUser = require("./services/database/getConnectedUser");
const deleteMeHandler = require("./services/deleteMe/deleteMe.handler");
const disconnectHandler = require("./services/disconnect/disconnect.handler");
const editMeHandler = require("./services/editMe/editMe.handler");
const SigninHandler = require("./services/signin/signin.handler");
const SignupHandler = require("./services/signup/signup.handler");

async function AccountPlugin(fastify, options, next) {
    const {
        userAdditionnalAttributes,
        usersFolder
    } = options;

    const mongoInstalled = fastify.mongo && fastify.mongo.db;
    let databaseDependantRoutes = [];
    if(mongoInstalled) {
        const userCollection = mongoInstalled.collection("users");
        const LicenceCodeCollection = mongoInstalled.collection("LicencesCodes");
        
        databaseDependantRoutes = databaseDependantRoutes.concat([
            
            new Route({
                method: "GET",
                path: "/me",
                handler: getConnectedUser(userCollection),
                schema: {
                    description: "Retourne l'utilisateur connecté",
                    summary: "Retourne l'utilsateur connecté",
                    tags: ["account"],
                    response: {
                        default: {
                            ...UserSchema,
                            properties: {
                                ...UserSchema.properties,
                                ...userAdditionnalAttributes
                            }
                        }
                    }
                },
                auth: true,
            }),

            new Route({
                method: "PUT",
                path: "/me/edit",
                handler: editMeHandler(userCollection),
                schema: {
                    description: "Edite l'utilisateur connecté",
                    summary: "Edite l'utilisateur connecté",
                    tags: ["account"]
                },
                auth: true,
            }),
    
            new Route({
                method: "DELETE",
                path: "/me/delete",
                handler: deleteMeHandler(userCollection),
                description: "Se désinscrire",
                schema:  {
                    description: "Supprime l'utilisateur connecté",
                    summary: "Supprime l'utilsateur connecté",
                    tags: ["account"]
                },
                auth: true,
            }),
    
            new Route({
                method: "POST",
                path: "/licenceCode/create",
                handler: createLicenceCodeHandler(LicenceCodeCollection),
                schema:  {
                    description: "Créer un code d'authentification",
                    summary: "Créer un code d'authentification",
                    tags: ["account"],
                    body: LicenceCodeFormSchema
                },
                auth: true,
                restrictedToRoles: ["admin"]
            }),
        ]);
    }

    const AccountRoutes = [
        ...databaseDependantRoutes,
        new Route({
            method: "POST",
            path: "/register",
            handler: SignupHandler(fastify, usersFolder),
            schema:  {
                description: "S'inscrire avec un Identifiant / Mot de passe",
                summary: "S'inscrire avec un Identifiant / Mot de passe",
                tags: ["account"],
                body: LoginSchema
            }
        }),
        
        new Route({
            method: "POST",
            path: "/signin",
            handler: SigninHandler(fastify),
            schema: {
                description: "Se connecter avec un Identifiant / Mot de passe",
                summary: "Se connecter avec un Identifiant / Mot de passe",
                tags: ["account"],
                body: LoginSchema
            }
        }),

        new Route({
            method: "GET",
            path: "/signout",
            handler: disconnectHandler,
            schema: {
                description: "Se déconnecter",
                summary: "Se déconnecter",
                tags: ["account"]
            }
        }),

        new Route({
            method: "GET",
            path: "/userAttributes",
            handler: (request, reply) => {
                new Response({
                    reply,
                    code: 200,
                    data: userAdditionnalAttributes,
                    message: "Chargement des attributs utilisateur réussi !"
                }).send();
            },
            schema: {
                description: "Retourne les attributs de l'utilisateur paramètrés par l'admin",
                summary: "Retourne les attributs de l'utilisateur paramètrés par l'admin",
                tags: ["account"],
            }
        }),

    ];//.map(r => addNamespaceToRoute(r, namespace));

    AccountRoutes.forEach(
        (route) => {
            fastify.route(route);
        }
    )

    next();
}

module.exports = fastifyPlugin(AccountPlugin);