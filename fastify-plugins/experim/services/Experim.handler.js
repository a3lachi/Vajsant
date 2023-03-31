

const Response = require("../../../model/Response.class");



const ExperimHandler = () => {

  return async (request, reply) => {

    const input = Object.entries(request.query)
    const output = input.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log('-------',output)


    const jsonString = JSON.stringify(output);


    const response = new Response({
      code:200,
      reply: reply,
      data: {'brr':'rrr'} ,
      message: "Exerim route seems to wrok"
    })
    response.send()
  }
}


module.exports = ExperimHandler;