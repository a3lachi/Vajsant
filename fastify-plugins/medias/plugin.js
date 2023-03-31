const fastifyPlugin = require("fastify-plugin");
const Route = require("../../model/route.class");
const getFaviconHandler = require("./services/getFavicon.handler");
const getMediasRoutes = require("./services/getMediasRoutes");

async function MediasPlugin(fastify, options, next) {
    let mediasRoutes = [ 
        new Route({
            method: "GET",
            path: "/favicon.ico",
            handler: getFaviconHandler("/assets"),
            schema: {
                description: "Retourne le favicon",
                summary: "Retourne le favicon",
                tags: ["medias"],
            }
        }),
    ];
    options.forEach(
        (mediaOptions) => {
            const mediaRoutes = getMediasRoutes(mediaOptions);
            mediasRoutes = mediasRoutes.concat(mediaRoutes)
        }
    );
    
    mediasRoutes.forEach(
        route => {
            fastify.route(route)
        }
    );

    next();
}

module.exports = fastifyPlugin(MediasPlugin);