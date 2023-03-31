

const fastifyPlugin = require("fastify-plugin");



const Route = require("../../model/route.class");
const ExperimHandler = require("./services/Experim.handler");


async function ExperimPlugin(fastify, options, next) {
    let mediasRoutes = [ 
        new Route({
            method: "GET",
            path: "/experim",
            handler: ExperimHandler(),
            description: "Experimentation route for aalachi",


            // schema is for Swagger, make sure properties are names in the same convetion as in plugins , "data"
            schema : {
              response: {
                default: {
                  description: 'Experim response',
                  type: 'object',
                  properties: {
                    data: { type: 'object' , properties: {
                      brr: {type: 'string'},
                    } },
                    message: { type: 'string' },
                  }
                
                }
              }
            }
        }),
        
    ];
    
    mediasRoutes.forEach(
        route => {
            fastify.route(route)
        }
    );

    next();
}

module.exports = fastifyPlugin(ExperimPlugin);