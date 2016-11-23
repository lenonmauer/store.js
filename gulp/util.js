const gulp = require('gulp');

module.exports = {
    exportTask: (task, dependencies) => {
        return {
            task, dependencies
        };
    }
};