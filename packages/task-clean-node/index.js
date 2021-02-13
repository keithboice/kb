const gulp = require('gulp');
const gulpClean = require('gulp-clean');

function clean() {
    console.log("Start cleaning old builds.");
    return gulp.src('build', {read: false, allowEmpty: true})
        .pipe(gulpClean())
}
