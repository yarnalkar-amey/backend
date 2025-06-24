const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");

function getPath(...subPaths) {
    return path.join(rootDir, ...subPaths);
}

module.exports = getPath;
