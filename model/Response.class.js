class Response {
    constructor({
        reply,
        code,
        message,
        data,
    }) {
        if(!reply) {
            console.error("Forgot to pass reply to response");
        }
        this.reply = reply;
        this.code = code;
        this.message = message;
        this.data = message ? {
            data,
            message
        } : data;
    }

    send() {
        this.reply.code(this.code);
        this.reply.send(this.data);
    }
}

module.exports = Response;