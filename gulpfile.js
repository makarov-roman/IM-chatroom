const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    vars = require('postcss-simple-vars'),
    autopref = require('autoprefixer'),
    flexbugs = require('postcss-flexbugs-fixes'),
    csso = require('postcss-csso'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached');


gulp.task('css', function () {
    return gulp.src('assets/css/*.css')
        .pipe(changed('assets/css/*', {extension: '.css'}))
        .pipe(cached('css'))
        .pipe(postcss([
            vars(),
            autopref(),
            flexbugs(),
            csso()
        ]))
        .pipe(gulp.dest('assets/dist/css/'));
});
gulp.task('watch', function () {
    gulp.watch('assets/css/*.css', ['css'])
});