const LicenceCodeFormSchema = {
    $id: "LicenceCodeForm",
    title: "LicenceCodeForm",
    type: "object",
    properties: {
        password: { type: "string"},
        roles: { type: "array" },
    },
    required: ["password", "roles"],
};

module.exports = LicenceCodeFormSchema;