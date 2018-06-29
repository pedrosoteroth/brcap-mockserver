const gulp = require('gulp');
const fs = require('fs');
const copydir = require('copy-dir');

function recursiveFindRoutes(path, routeFolders) {
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(`${path}/${file}`).isDirectory()) {
            if (file === 'routes')
                routeFolders.push(`${path}/${file}`);
            else
                recursiveFindRoutes(`${path}/${file}`, routeFolders);
        }
    })
    return routeFolders;
}

gulp.task('clone-routes', () => {
    const routeFolders = recursiveFindRoutes('./mocks', []);
    routeFolders.forEach(folder => {
        copydir.sync(folder, '_mocks');
    })
});

gulp.task('default', () => {
    gulp.watch('**/*.mock', ['clone-routes']);
});