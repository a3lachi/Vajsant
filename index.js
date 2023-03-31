const server_options = require("./server--options");
const fastify = require("fastify")(server_options);
const applyPlugins = require("./server--plugins");

applyPlugins(fastify);

// ## INITIALIZE ALL
fastify.listen(
    server_options,
    function (err, address) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
);

