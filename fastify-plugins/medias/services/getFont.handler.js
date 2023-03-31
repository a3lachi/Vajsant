const tryGetMediaHandler = require("../tryGetMedia.handler");
const { FontsDir, admin_FontsDir } = require("../../../model/variables/customPaths")();

module.exports = function getFontHandler(namespace) {
    const fontDirs = [FontsDir, admin_FontsDir];
    return tryGetMediaHandler(namespace, "font", fontDirs);
};