import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify"; 
import rename from "gulp-rename"; 
import concat from "gulp-concat";
import cleanCSS  from "gulp-clean-css";
import browsersync from "browser-sync";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import include from 'gulp-file-include';

/*------------------------------------------------------------------------------------*/

const buildFolder = `./dist`;
const srcFolder = `./app`;

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        sass: `${buildFolder}/sass/`,
        json: `${buildFolder}/js/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
    },
    src: {
        html: `${srcFolder}/**.html`,
        css: `${srcFolder}/css/*.css`,
        sass: `${srcFolder}/sass/*.scss`,
        json: `${srcFolder}/js/*.json`,
        js: `${srcFolder}/js/*.js`,
        img: `${srcFolder}/img/*`,
    },
    watch: {
        files: `${srcFolder}/*/*`,
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

async function html (){
    return app.gulp.src(app.path.src.html)
    .pipe(include({
        prefix: `@@`
    }))
    .pipe(app.gulp.dest(app.path.build.html))
}

async function css(){
    return app.gulp.src(app.path.src.css)
        .pipe(concat('styles.css'))
        .pipe (cleanCSS())
        .pipe (rename ({suffix: '.min'}))
        .pipe(app.gulp.dest(app.path.build.css))
}

async function scss() {
    return app.gulp.src (app.path.src.sass)
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe (cleanCSS())
        .pipe(app.gulp.dest(app.path.build.sass))
}

async function scripts () {
    return app.gulp.src(app.path.src.js)
        .pipe (concat ( 'scripts.js'))
        .pipe (uglify ())
        .pipe (rename ({suffix: '.min'}))
        .pipe(app.gulp.dest(app.path.build.js))
}

async function json () {
    return app.gulp.src(app.path.src.json)
        .pipe(app.gulp.dest(app.path.build.json))
}

async function images (){
    return app.gulp.src(app.path.src.img)
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(app.gulp.dest(app.path.build.img))
}

async function watcher (done){
    gulp.watch(app.path.watch.files, html);
    gulp.watch(app.path.watch.files, scripts);
    gulp.watch(app.path.watch.files, images);
    gulp.watch(app.path.watch.files, css);
    gulp.watch(app.path.watch.files, scss);
    done();
}

async function server (){
    browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000,
    });
}

/*------------------------------------------------------------------------------------*/

const mainTask = gulp.series(html, css, json, scripts, images);

const dev = gulp.series(mainTask, gulp.parallel(watcher, server));

/*------------------------------------------------------------------------------------*/

gulp.task ( "default", dev);