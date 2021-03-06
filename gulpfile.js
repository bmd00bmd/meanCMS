"use strict"

const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    lint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    annotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    connect = require('gulp-connect'),
    todo = require('gulp-todo');

let config = {
    paths: {
        html: 'index.html',
        js: [
            'src/app/app.js',
            'src/app/components/**/*.js',
            'src/app/components/**/**/*.js',
            'src/app/shared/*.js'
        ],
        server: [
            'server/*.js',
            'server/**/**/*.js',
            'server/**/*.js',
        ],
        templates: ['src/app/components/**/*.html', 'src/app/components/**/**/*.html'],
        imgs: ['src/assets/imgs/*.jpg', 'src/assets/imgs/*.png'],
        dist: 'dist',
        sass: 'src/assets/scss/*.scss'
    }
};

gulp.task('connect', () => {
    connect.server({
        livereload: true
    });
});

gulp.task("js", () => {
    return gulp.src(config.paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(annotate().on('error', util.log))
        .pipe(gulp.dest(config.paths.dist + '/js'))
        .pipe(uglify({ mangle: false }).on('error', util.log))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.dist + '/js'));
});

gulp.task('sass', () => {
    return gulp.src(config.paths.sass)
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('html', () => {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('template', () => {
    return gulp.src(config.paths.templates)
        .pipe(gulp.dest(config.paths.dist + "/views"));
});

gulp.task('imgs', () => {
    return gulp.src(config.paths.imgs)
        .pipe(gulp.dest(config.paths.dist + "/imgs"));
});

gulp.task('lint', () => {
    return gulp.src(config.paths.js.concat(config.paths.server))
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});

gulp.task('watch', () => {
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.sass, ['sass']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.templates, ['template']);
});

gulp.task('todo', function() {
    gulp.src(config.paths.js.concat(config.paths.server))
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

gulp.task('test', () => {
    // spec/*.js
    gulp.src(['specs/user.spec.js'])
        .pipe(mocha({
            timeout: 3000
        }))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });;
});

gulp.task('build', ['html', 'template', 'sass', 'imgs', 'js']);

gulp.task("default", ['build', 'watch', 'connect']);