const Response = require("../../../../model/Response.class");
const disconnect = require("./disconnect");

async function disconnectHandler(request, reply) {
    disconnect(request, reply);
    new Response({
        reply,
        code: 200,
        message: "Vous avez bien été déconnecté !"
    }).send()
}

module.exports = disconnectHandler;