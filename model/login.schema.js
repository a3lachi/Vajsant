module.exports = {
    $id: "login",
    title: "Login",
    type: "object",
    properties: {
        licenceCode: {type: "string"},
        authAttr: { type: "string" },
        attrValue: { type: "string" },
        password: { type: "string" }
    },
    required: ["authAttr", "attrValue", "password"]
};