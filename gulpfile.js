var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

function scssConvert(done) {
    gulp.src('./scss/**/*')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
    done();
};

function watchFiles() {
    gulp.watch("./scss/**/*", scssConvert);
}
function sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

gulp.task('default', gulp.series(scssConvert, sync));
gulp.task('dev', gulp.parallel(sync, watchFiles));