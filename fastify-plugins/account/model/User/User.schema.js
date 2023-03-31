module.exports = {
    $id: "user",
    title: "User",
    type: "object",
    properties: {
        _id: { type: "string" },
        username: { type: "string"},
        password: { type: "object" },
        loginUserAttr: { type: "string" },
        roles: { type: "array" },
    },
    required: [
        "password",
    ]
};