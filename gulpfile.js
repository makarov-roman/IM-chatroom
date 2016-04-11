const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    animation = require('postcss-animation'),
    //lost = require('lost'),
    //media = require('postcss-media-minmax'),
    //pxtorem = require('postcss-pxtorem');
    //extend = require('postcss-extend'),
    //autoreset = require('postcss-autoreset'),
    autopref = require('autoprefixer'),
    flexbugs = require('postcss-flexbugs-fixes'),
    nano = require('cssnano'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached');


gulp.task('css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(changed('assets/css/*', {extension: '.css'}))
        .pipe(cached('css'))
        .pipe(postcss([
            autopref(),
            flexbugs(),
            nano()
            ]))
        .pipe(gulp.dest('assets/dist/css/'));
});
gulp.task('watch', function() {
        gulp.watch('assets/css/*.css', ['css'])
});