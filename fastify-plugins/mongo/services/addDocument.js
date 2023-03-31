async function addDocument(
    documentCollection,
    document,
    documentTypeName,
    nameProperty
) {
    let HTTPCode = 200;
    let info = (
        documentTypeName[0].toUpperCase()
        + documentTypeName.slice(1)
        + " fraichement créé !"
    );
    const userId = "";
    try {
        const res = await documentCollection.insertOne(document);
        userId = res.insertedId.toString();
    } catch (err) {
        console.log("error : %o", err);
        HTTPCode = 500;
        info = err.errmsg;
        if(err.errmsg && err.errmsg.includes("duplicate key")){
            console.log("err.errmsg : %o", err.errmsg);
            HTTPCode = 409,
            info = `Désole il existe deja un ${documentTypeName} nommé : ${document[nameProperty]}`;
        }
    }
    return {
        HTTPCode,
        userId,
        message: info,
    };
}

module.exports = addDocument;