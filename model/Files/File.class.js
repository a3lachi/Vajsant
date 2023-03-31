const validate = require("../../validate");
const fileSchema = require("./file.schema");

class File {
    constructor({
        folderPath,
        name,
        extension,
        filePath,
        content = "",
    }) {
        if(filePath) {
            this.buildFileFromFilePath(filePath);
        }else {
            this.buildFileFromFolderPathAndName(folderPath, name, extension);
        }
        
        this.setContent(content);
        
        this.path = (
            this.folderPath[this.folderPath.length - 1] === "/" ?
                this.folderPath
            :
                this.folderPath + "/"
        ) + (
            this.name + (
                this.extension ? 
                    ("." + this.extension)
                :
                    ""
            )
        );

        validate(
            "File " + this.name,
            this,
            fileSchema
        );
    }

    buildFileFromFilePath(filePath) {
        let filePaths = filePath.split("/");
        
        if (filePaths[filePaths.length - 1].includes(".")) {
            let fileName = filePaths.pop();
            fileName = fileName.split(".");
            this.extension = fileName[fileName.length - 1];
            fileName.pop();
            this.name = fileName.join(".");
        }
        this.folderPath = filePaths.join("/");
    }
    
    buildFileFromFolderPathAndName(folderPath, name, extension) {
        this.folderPath = folderPath;
        this.name = name;
        if(extension) {
            this.extension = extension;
        }else {
            const tmp = name.split(".");
            this.extension = tmp[tmp.length - 1];
            tmp.pop();
            this.name = tmp.join(".");
        }
    }
    
    setContent(content) {
        this.content = content;
        return this;
    }
    
    getFullPath(){
        return this.path;
    }
}

module.exports = File;