const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function compileSass() {
    return gulp
        .src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))  // Guardar los estilos en la carpeta "css"
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src',
        },
    });
    gulp.watch('src/sass/**/*.scss', compileSass);
    gulp.watch('src/*.html').on('change', browserSync.reload);
}

exports.compileSass = compileSass;
exports.watch = watch;
