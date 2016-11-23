const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

function readTasks(){
    const basePath = path.join(__dirname, 'tasks');
    fs.readdirSync(basePath)
    .filter((filename) => filename.match(/\.js$/i))
    .map((filename) => {
        const task = filename.substr(filename.lastIndexOf('/')+1, filename.length-3);
        const file = path.join(basePath, task);
        return {
            name: task,
            contents: require(file)()
        };
    })
    .forEach((file) => {
        gulp.task(file.name, file.contents.dependencies, file.contents.task);
    });
}

module.exports = readTasks;