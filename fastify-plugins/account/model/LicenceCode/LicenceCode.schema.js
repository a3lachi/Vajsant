module.exports = {
    $id: "LicenceCode",
    title: "LicenceCode",
    type: "object",
    properties: {
        _id: { type: "string" },
        hashedPassword: { type: "object"},
        roles: { type: "array" },
    },
    required: ["hashedPassword"],
};