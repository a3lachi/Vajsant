const fs = require("fs");

const fileSchema = require("./file.schema");
const File = require("./File.class");
const ServerFolder = require("../Folders/ServerFolder.class");
const validate = require("../../validate");

class ServerFile extends File {
    constructor({
        folderPath,
        name,
        extension = "",
        filePath,
        content = "",
    }) {
        const props = {
            folderPath,
            name,
            extension,
            filePath,
            content,
        };

        super(props);

        this.parentFolder = new ServerFolder({
            folderPath: this.folderPath
        });

        if(this.exist()) {
            this.setContent(this.read());
        }
        
        validate(
            "File " + this.name,
            this,
            fileSchema
        );
    }

    createParentDirectories() {
        this.parentFolder.create();
    }

    exist() {
        try {
            return fs.existsSync(this.path);
        } catch (error) {
            return false;
        }
    }

    read() {
        return (
            this.exist() ?
                fs.readFileSync(
                    this.path
                )
            :
                "Editide ne trouve pas le fichier " + this.extension +
                " nommé " + this.name + " au chemin : " + this.path
        );
    }

    create() {
        this.save();
    }

    save(){
        const filePath = this.getFullPath();
        this.createParentDirectories();
        fs.writeFileSync(
            filePath,
            this.content,
            function(err) {
                /* istanbul ignore if */
                if(err) {
                    console.log("Couldn't save the file %s : %o", filePath, err);
                }
            }
        );
    }

    rename(newName) {
        if(this.exist()) {
            console.log("this.getFullPath() : %o", this.getFullPath());
            console.log("this.folderPath + newName : %o", this.folderPath + newName);
            fs.renameSync(this.getFullPath(), this.folderPath + "/" + newName);
            return {
                code: 200,
                message: "File deleted :)"
            };
        }else {
            return {
                code: 404,
                message: "File does not exist :( - " + this.getFullPath()
            };
        }
    }

    delete() {
        if(this.exist()) {
            const filePath = this.getFullPath();
            fs.unlinkSync(filePath);
            return {
                code: 200,
                message: "File deleted :)"
            };
        } else {
            const message = "File does not exist :( - " + this.getFullPath();
            console.error(message);
            return {
                code: 404,
                message: message
            };
        }
    }
}

module.exports = ServerFile;