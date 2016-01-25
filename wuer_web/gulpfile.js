var gulp = require('gulp');


var less = require('gulp-less');
var path = require('path');
var react = require('gulp-react');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('default', function () {
    console.log('hello')
});

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('jsx', function () {
    return gulp.src(["./src/jsx/Util.js",
            "./src/jsx/Content.js",
            "./src/jsx/Header.js",
            "./src/jsx/Login.js",
            "./src/jsx/Register.js",
            "./src/jsx/LeftArea.js",
            "./src/jsx/RightArea.js",
            "./src/jsx/Main.js"])
        .pipe(concat('all.js'))
        .pipe(react())
        .on('error', function (err) {
            console.log('jsx error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('./public/js'));
});

gulp.task('copy_img', function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./public/img'));
});

gulp.task('copy_lib', function () {
    return gulp.src('./src/lib/*')
        .pipe(gulp.dest('./public/lib'));
});

gulp.task('watch', function () {
    gulp.watch('./src/jsx/*.js', ['jsx']);
    gulp.watch('./src/less/*.less', ['less']);
    gulp.watch('./src/img/*', ['copy_img']);
    gulp.watch('./src/lib/*', ['copy_lib']);
});

gulp.task('clean', function () {
    return gulp.src('./public', {read: false})
        .pipe(clean());
});

gulp.task('copy_lib', function () {
    return gulp.src('./src/lib/*')
        .pipe(gulp.dest('./public/lib'));
});


gulp.task('build', function () {
    runSequence('clean',
        ['less', 'jsx', 'copy_img', 'copy_lib']);
});

