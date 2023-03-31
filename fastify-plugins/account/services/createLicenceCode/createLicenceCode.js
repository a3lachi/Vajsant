const securePassword = require("secure-password");
const LicenceCode = require("../../model/LicenceCode/LicenceCode.class");
const pwd = securePassword();
const DUPLICATE_KEY_ERROR = 11000;

module.exports = async function createLicenceCode(LicencesCodeCollection, password, roles) {
    const hashedPassword = await pwd.hash(
        Buffer.from(password)
    );

    try{
        await LicencesCodeCollection.insertOne(
            new LicenceCode({
                hashedPassword: hashedPassword,
                roles: roles.split(","),
            })
        );
    }
    // istanbul ignore next
    catch (err) {
        return {
            HTTPCode: 500,
            message: "Désolé un problème c'est produit pendant la création du code."
        };
    }
    return {
        HTTPCode: 200,
        message: "Code de licence créé avec succès !"
    };
};