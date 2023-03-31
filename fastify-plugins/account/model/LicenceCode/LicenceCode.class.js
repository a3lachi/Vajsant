const validate = require("../../../../validate");
const LicenceCodeSchema = require("./LicenceCode.schema");

class LicenceCode {
    constructor({
        _id,
        hashedPassword,
        roles
    }) {
        /* istanbul ignore if  */
        if (_id) {
            this._id = _id;
        }
        this.hashedPassword = hashedPassword;
        this.roles = roles;

        validate(
            "LicenceCode",
            this,
            LicenceCodeSchema
        );
    }
}

module.exports = LicenceCode; 