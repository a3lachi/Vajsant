const Response = require("../../../../model/Response.class");

function disconnect(request, reply) {
    if (request.session.authenticated) {
        request.destroySession(
            (err) => {
                if (err) {
                    new Response({
                        code: 500,
                        message: 'Internal Server Error during session destroy',
                    }).send();
                }
            }
        )
    }
}

module.exports = disconnect;