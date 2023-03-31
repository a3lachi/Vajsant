async function HaveUsersInDB(userCollection){
    const users = await userCollection.find({});
    const res = (await users.toArray()).length > 0;
    return res;
}

module.exports = HaveUsersInDB;