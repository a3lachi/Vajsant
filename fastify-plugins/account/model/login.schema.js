const LoginSchema = {
    $id: "login",
    title: "Login",
    type: "object",
    properties: {
        licenceCode: {type: "string"},
        loginUserAttr: { type: "string" },
        login: { type: "string" },
        password: { type: "string" }
    },
    required: ["loginUserAttr", "login", "password"]
};

module.exports = LoginSchema;