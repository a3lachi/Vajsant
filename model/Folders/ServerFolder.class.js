const fs = require("fs");
const ServerFile = require("../Files/ServerFile.class");
const Folder = require("./Folder.class");

class ServerFolder extends Folder {
    constructor({
        folderPath,
        name
    }) {
        const props = {
            folderPath,
            name
        };
        super(props);
    }

    /**
     * @param {string} directoryPath 
     * @param {boolean} directory 
     * @param {boolean} files 
     * @returns {object} An array with the name of all the directory / files inside the directory
     */
    getFromDir(directoryPath, directory, files) {
        let res = [];
        let filesInDir = fs.readdirSync(directoryPath);
        if (directory && files) {
            res = filesInDir;
        } else {
            filesInDir.forEach(
                (file) => {
                    var fileStats = fs.lstatSync(
                        directoryPath + "/" + file
                    );
                    if (
                        directory &&
                        fileStats.isDirectory()
                    ||
                        files &&
                        fileStats.isFile()
                    ){
                        res.push(file);
                    }
                }
            );
        }
        return res;
    }

    /**
     * @param {*} directoryPath 
     * @returns An array with the name of all the directory inside the directory
     */
    getDirectoriesFrom(directoryPath) {
        return this.getFromDir(directoryPath, true, false);
    }

    /**
     * @param {*} directoryPath 
     * @returns An array with the name of all the files inside the directory
     */
    getFilesFrom(directoryPath, asObject, regex) {
        let files = this.getFromDir(directoryPath, false, true);

        if(regex) {
            files = files.filter(
                f => f.match(regex)
            );
        }
        if (asObject) {
            return files.map(
                (fileName) => new ServerFile({
                    folderPath: directoryPath,
                    name: fileName,
                })
            );
        } else {
            return files;
        }
    }

    getFiles(regex) {
        return this.getFilesFrom(
            this.getFullPath(),
            false,
            regex
        );
    }

    // getRecursiveFiles() {
    //     const subFolders = this.getFolders();
    //     subFolders.forEach(
    //         (subFolder) => {
    //             subFolder.get
    //         }
    //     )
    // }

    getFolders() {
        return getDirectoriesFrom(
            this.getFullPath()
        );
    }

    exists () {
        return fs.existsSync(
            this.getFullPath()
        );
    }

    create() {
        const folderDoNotExist = !this.exists();
        if (folderDoNotExist) {
            fs.mkdirSync(
                this.getFullPath(),
                { recursive: true }
            );
        }

        return this;
    }
}

module.exports = ServerFolder;