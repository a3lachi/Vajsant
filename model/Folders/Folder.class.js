const validate = require("../../validate");
const folderSchema = require("./folder.schema");

class Folder {
    constructor({
        folderPath,
        name = ""
    }) {
        if(name) {
            this.folderPath = folderPath;
            this.name = name;
        } else {
            const pathAsArray = folderPath.split("/");
            this.name = pathAsArray.pop();
            this.folderPath = pathAsArray.join("/");
        }
        

        validate(
            "Folder " + this.name,
            this,
            folderSchema
        );
    }

    getFullPath() {
        return this.folderPath + "/" + this.name;
    }
}

module.exports = Folder;