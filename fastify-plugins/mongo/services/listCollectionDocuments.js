async function listCollectionDocuments({
    findData = {},
    collection,
    count,
    attributesToInclude
}){
    const documents = await collection.find(
        findData,
        attributesToInclude
    ).limit(count);
    const res = await documents.toArray();
    return res;
}

module.exports = listCollectionDocuments;