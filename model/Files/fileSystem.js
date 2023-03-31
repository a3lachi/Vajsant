//# Imports
const fs = require("fs");

//# Variables
var fileContent = "";

//# CRUD

//## Read
function getFile() {
    return fileContent;
}

/**
 * @param {string} directoryPath 
 * @param {boolean} directory 
 * @param {boolean} files 
 * @returns {object} An array with the name of all the directory / files inside the directory
 */
function getFromDir(directoryPath, directory, files) {
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
function getDirectoriesFrom(directoryPath) {
    return getFromDir(directoryPath, true, false);
}

/**
 * @param {*} directoryPath 
 * @returns An array with the name of all the files inside the directory
 */
function getFilesFrom(directoryPath, asObject, regex) {
    let files = getFromDir(directoryPath, false, true);
    const File = require("../../model/files/file/ServerFile.class");

    if(regex) {
        files = files.filter(
            f => f.match(regex)
        );
    }
    if (asObject) {
        return files.map(
            (fileName) => new File({
                folderPath: directoryPath,
                name: fileName,
            })
        );
    } else {
        return files;
    }
}

function getAllFilesPathsFromDirectory(directoryPath, addDirectoryPath = false) {
    let res = getFilesFrom(directoryPath);
    let directories = getDirectoriesFrom(directoryPath);
    directories.forEach(
        (directory) => {
            let newDirectoryPath = directoryPath + "/" + directory;
            let filesInNewDirectory = getAllFilesPathsFromDirectory(newDirectoryPath, directory);

            res = res.concat(
                filesInNewDirectory
            );
        }
    );

    if (addDirectoryPath) {
        res = res.map(
            path => addDirectoryPath + "/" + path 
        );
    }

    return res;
}


//## Update
function setFile(file) {
    fileContent = fs.readFileSync(file).toString();
}

module.exports = {
    getFilesFrom,
    getFile,
    setFile,
    getDirectoriesFrom,
    getAllFilesPathsFromDirectory,
};