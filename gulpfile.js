import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify"; 
import rename from "gulp-rename"; 
import {deleteAsync} from "del";
import concat from "gulp-concat";
import cleanCSS  from "gulp-clean-css";
import browsersync from "browser-sync";

/*------------------------------------------------------------------------------------*/

const buildFolder = `./dist`;
const srcFolder = `./app`;

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        css: `${srcFolder}/css/*.css`,
        js: `${srcFolder}/js/*.js`,
        img: `${srcFolder}/img/*.+ (jpg | jpeg | png | gif)`,
    },
    watch: {
        files: `${srcFolder}/*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
} 

global.app ={
    path: path,
    gulp: gulp
}

/*------------------------------------------------------------------------------------*/

const html = () => {
    return app.gulp.src(app.path.src.html)
    .pipe(app.gulp.dest(app.path.build.html))
}

const css = () => {
    return app.gulp.src(app.path.src.css)
    .pipe(concat('boostrap.css'))
    .pipe (cleanCSS())
    .pipe(app.gulp.dest(app.path.build.css))
}

const scripts = () => {
    return app.gulp.src(app.path.src.js)
    .pipe (concat ( 'boostrap.js'))
    .pipe (uglify ())
    .pipe(app.gulp.dest(app.path.build.js))
}

const imgs = () => {
    return app.gulp.src(app.path.src.img)
    .pipe (imagemin ({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(app.gulp.dest(app.path.build.img))
}

const reset = () => {
    return deleteAsync(app.path.clean);
}

const watcher = () => {
    gulp.watch(app.path.watch.files, html);
}

const server = () => {
    browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000,
    });
}

/*------------------------------------------------------------------------------------*/

const mainTask = gulp.series( html, css, scripts, imgs);

const dev = gulp.series(reset,mainTask, gulp.parallel(watcher, server));

/*------------------------------------------------------------------------------------*/

gulp.task ( "default", dev);