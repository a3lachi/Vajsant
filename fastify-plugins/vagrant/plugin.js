const fastifyPlugin = require("fastify-plugin");
const Response = require("../../model/Response.class");
const Route = require("../../model/route.class");
const vagrantRootPath = require("../../vagrant/vagrantRootPath");
const executeShellCommand = require("./services/executeShellCommand");
const JsonToRuby = require('./jsonToRb.js')





async function VagrantPlugin(fastify, options, next) {

    const vagrantRoutes = [
        new Route({
            method: "GET",
            path: "/vagrant/up",
            handler: async (request, reply) => {
                const res = await executeShellCommand("vagrant up", vagrantRootPath);
                new Response({
                  reply,
                  code: res.code,
                  data: res.data,
                }).send();
            },
            schema: {
                description: 'Lance les machines virtuelles',
                tags: ['vagrant'],
                summary: 'Lance les machines virtuelles',
                response: {
                  default: {
                    description: 'Default response',
                    type: 'object',
                    properties: {
                      foo: { type: 'string' }
                    }
                  }
                }
              }
        }),
        new Route({
            method: "GET",
            path: "/vagrant/global-status",
            handler: async (request, reply) => {
                const res = await executeShellCommand("vagrant global-status --prune", vagrantRootPath);
                new Response({
                    reply,
                    code: res.code,
                    data: res.data,
                }).send();
            },
            schema: {
                description: 'Liste les machines avec leur statut',
                tags: ['vagrant'],
                summary: 'Liste les machines avec leur statut',
                response: {
                  default: {
                    description: 'Default response',
                    type: 'object',
                    properties: {
                      foo: { type: 'string' }
                    }
                  }
                }
              }
        }),
        new Route({
          method: "POST",
          path: "/vagrant/destroy",
          handler: async (request, reply) => {
              const option = request.body.opt // custom option to delete all or just one
              const boxes = request.body.boxes // name of the machines to delete
              if (option === "all") {
                var res = await executeShellCommand("ls", vagrantRootPath);
              } else {
                var cmd = ""
                for (const box of boxes) {
                  cmd += box + ' '
                }
                res = await executeShellCommand("vagrant destroy -f "+cmd, vagrantRootPath) ;
              }
              new Response({
                  reply,
                  code: res.code,
                  data: res.data,
                  message:"Destruction du box avec succés. ou non.",
              }).send();
          },
          schema: {
              description: 'Detruire une machine',
              tags: ['vagrant'],
              summary: 'Detruire une machine',
              response: {
                default: {
                  description: 'Destroy vagrant image',
                  type: 'object',
                  properties: {
                    data: { type: 'string' , properties:{
                      opt: { type : 'string' },
                      boxes: { type : 'object'},
                      name : { type : 'string' },
                    } },
                    message: { type: 'string'},
                  }
                }
              }
            }
        }),




        new Route({
          method: "POST",
          path: "/vagrant/halt",
          handler: async (request, reply) => {
              const option = request.body.opt // custom option to delete all or just one
              const boxes = request.body.boxes // name of the machines to delete
              if (option === "all") {
                var res = await executeShellCommand("ls", vagrantRootPath);
              } else {
                var cmd = ""
                for (const box of boxes) {
                  cmd += box + ' '
                }
                res = await executeShellCommand("vagrant halt "+cmd, vagrantRootPath) ;
              }
              new Response({
                  reply,
                  code: res.code,
                  data: res.data,
                  message:"Arret des machines avec halt.",
              }).send();
          },
          schema: {
              description: 'Arreter une machine',
              tags: ['vagrant'],
              summary: 'Arreter une machine',
              response: {
                default: {
                  description: 'Stop vagrant image',
                  type: 'object',
                  properties: {
                    data: { type: 'string' , properties:{
                      opt: { type : 'string' },
                      boxes: { type : 'object'},
                      name : { type : 'string' },
                    } },
                    message: { type: 'string'},
                  }
                }
              }
            }
        }),








        new Route({
          method: "POST",
          path: "/vagrant/config/machine",
          handler: async (request, reply) => {


              const machine = request.body 

              JsonToRuby(machine,vagrantRootPath)

              new Response({
                  reply,
                  code: 200,
                  data: "brrrr",
                  message:"Configuring machines",
              }).send();
          },
          schema: {
              description: 'Arreter une machine',
              tags: ['vagrant'],
              summary: 'Arreter une machine',
              response: {
                default: {
                  description: 'Stop vagrant image',
                  type: 'object',
                  properties: {
                    data: { type: 'string' , properties:{
                      machine: { type : 'object'},
                    } },
                    message: { type: 'string'},
                  }
                }
              }
            }
        }),



    ];
    
    vagrantRoutes.forEach(
        route => {
            fastify.route(route)
        }
    )
}

module.exports = fastifyPlugin(VagrantPlugin);