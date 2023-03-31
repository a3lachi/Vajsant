const applyPlugins = require("./server--plugins");
const serverOptions = require("./server--options");

module.exports = async function (fastify, option) {
    await applyPlugins(fastify);
};


module.exports.options = serverOptions;