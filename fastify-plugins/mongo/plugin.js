const fastifyPlugin = require("fastify-plugin");
const addDocument = require("./services/addDocument");
const deleteDocument = require("./services/deleteDocument");
const editDocument = require("./services/editDocument");
const getDocumentById = require("./services/getDocumentById");
const listCollectionDocuments = require("./services/listCollectionDocuments");

async function MongoPlugin(fastify, options, next) {
    fastify.decorate(
        "addDocument",
        addDocument
    )
    fastify.decorate(
        "editDocument",
        editDocument
    )
    fastify.decorate(
        "getDocumentById",
        getDocumentById
    )
    fastify.decorate(
        "listCollectionDocuments",
        listCollectionDocuments
    )
    fastify.decorate(
        "deleteDocument",
        deleteDocument
    )

    next();
}

module.exports = fastifyPlugin(MongoPlugin);