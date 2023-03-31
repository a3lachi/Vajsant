const validate = require("../../../../validate.js");
const userSchema = require("./User.schema.js");

class User {
    constructor({
        id,
        username,
        loginUserAttr = "username",
        password,
        roles,

        additionnalAttributes = {},
    }) {
        this._id = id;
        this.username = username;
        this.loginUserAttr = loginUserAttr;
        this.password = password;
        this.roles = roles;
        
        Object.entries(additionnalAttributes).forEach(
            ([key, value]) => {
                this[key] = value;
            }
        );
        
        validate(
            "User : " + this.id,
            this,
            userSchema
        );
    }
}

module.exports = User;