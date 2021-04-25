module.exports = (io) => {
    const fs = require("fs");
    const path = require("path");
    // Full path to the current directory
    const listenersPath = path.resolve(__dirname);
    // Reads all the files in a directory
    console.log(listenersPath);
    fs.readdir(listenersPath, (err, files) => {
        if (err) {
            process.exit(1);
        }
        files.map(fileName => {
            if (fileName !== "index.js") {
                console.log("Initializing listener at: %s", fileName);
                // Requires all the files in the directory that is not a index.js.
                const listener = require(path.resolve(__dirname, fileName));
                // Initialize it with io as the parameter.
                listener(io);
            }
        });
    });
};