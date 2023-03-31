const securePassword = require("secure-password");
const pwd = securePassword();
const HaveUsersInDB = require("../database/HaveUsersInDB.js");
const User = require("../../model/User/User.class");
const addDocument = require("../../../mongo/services/addDocument.js");

module.exports = async function signup(userCollection, loginUserAttr, login, password, onUserCreation) {
    const hashedPassword = await pwd.hash(
        Buffer.from(password)
    );

    const data = {
        loginUserAttr,
        [loginUserAttr]: login,
        password: hashedPassword,
        roles: ["guest"],
    };
    const user = new User(data);
    
    const setAdmin = !(await HaveUsersInDB(userCollection));
    
    if (setAdmin) {
        user.roles = ["admin"];
    }
    
    const {
        message,
        userId,
        HTTPCode,
    } = await addDocument(
        userCollection,
        user,
        "utilisateur",
        "username"
    );

    if (onUserCreation) {
        onUserCreation(userId);
    }

    return {
        HTTPCode,
        message,
        userId: user._id,
        roles: user.roles.toString(),
    };
};