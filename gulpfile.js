// Compilador de SASS
const { src, dest, watch, parallel } = require('gulp');
// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')
//Convertir imagenes a webp
const webp = require('gulp-webp')
function css(fn) {
    // Identificar los archivos sass
    src('src/scss/**/*.scss')
        .pipe(plumber())
    //Compilar
        .pipe(sass())
    //Almacenar
        .pipe(dest('build/css'))
    fn();
}
function versionWebp(fn){

    const opciones = {
        quality:50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    fn();
}
function dev(fn) {
    watch('src/scss/**/*.scss', css);

    fn();
}


exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);


