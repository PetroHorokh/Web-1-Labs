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
        css: `${srcFolder}/**/*.css`,
        js: `${srcFolder}/**/*.js`,
        img: `${srcFolder}/**/*.+ (jpg | jpeg | png | gif)`,
    },
    watch: {
        files: `${srcFolder}/*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    ftp: ``
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
    .pipe(concat('styles.css'))
    .pipe (cleanCSS())
    .pipe (rename ({suffix: '.min'}))
    .pipe(app.gulp.dest(app.path.build.css))
}

const scripts = () => {
    return app.gulp.src(app.path.src.js)
    .pipe (concat ( 'scripts.js'))
    .pipe (uglify ())
    .pipe (rename ({suffix: '.min'}))
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

const watcher = (done) => {
    gulp.watch(app.path.watch.files, html);
    gulp.watch(app.path.watch.files, scripts);
    gulp.watch(app.path.watch.files, imgs);
    done();
}

const server = (done) => {
    browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000,
    });
    done();
}

/*------------------------------------------------------------------------------------*/

const dev = gulp.series(reset, html, css, scripts, imgs, gulp.parallel(watcher, server));

/*------------------------------------------------------------------------------------*/

gulp.task ( "default", dev);