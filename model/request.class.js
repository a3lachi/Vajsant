class Request {
    constructor({
        fastifyRequestObject
    }) {
        this.fastifyRequestObject = fastifyRequestObject;
        this.query = fastifyRequestObject.query ;// the parsed querystring, its format is specified by querystringParser
        this.body = fastifyRequestObject.body ;// the request payload, see Content-Type Parser for details on what request payloads Fastify natively parses and how to support other content types
        this.params = fastifyRequestObject.params ;// the params matching the URL
        this.headers = fastifyRequestObject.headers ;// the headers getter and setter
        this.raw = fastifyRequestObject.raw ;// the incoming HTTP request from Node core
        this.server = fastifyRequestObject.server ;// The Fastify server instance, scoped to the current encapsulation context
        this.id = fastifyRequestObject.id ;// the request ID
        this.log = fastifyRequestObject.log ;// the logger instance of the incoming request
        this.ip = fastifyRequestObject.ip ;// the IP address of the incoming request
        this.ips = fastifyRequestObject.ips ;// an array of the IP addresses, ordered from closest to furthest, in the X-Forwarded-For header of the incoming request (only when the trustProxy option is enabled)
        this.hostname = fastifyRequestObject.hostname ;// the host of the incoming request (derived from X-Forwarded-Host header when the trustProxy option is enabled). For HTTP/2 compatibility it returns :authority if no host header exists.
        this.protocol = fastifyRequestObject.protocol ;// the protocol of the incoming request (https or http)
        this.method = fastifyRequestObject.method ;// the method of the incoming request
        this.url = fastifyRequestObject.url ;// the URL of the incoming request
        this.routerMethod = fastifyRequestObject.routerMethod ;// the method defined for the router that is handling the request
        this.routerPath = fastifyRequestObject.routerPath ;// the path pattern defined for the router that is handling the request
        this.is404 = fastifyRequestObject.is404 ;// true if request is being handled by 404 handler, false if it is not
        this.connection = fastifyRequestObject.connection ;// Deprecated, use socket instead. The underlying connection of the incoming request.
        this.socket = fastifyRequestObject.socket ;// the underlying connection of the incoming request
        this.context = fastifyRequestObject.context ;// A Fastify internal object. You should not use it directly or modify it. It is useful to access one special key
    }
}

module.exports = Request;