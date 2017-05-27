/*
 * @Author: bin
 * @Date:   2017-05-25 22:25:58
 * @Last Modified by:   bin
 * @Last Modified time: 2017-05-26 11:10:06
 */
'use strict';
//引用的包：npm install gulp gulp-less gulp-cssnano gulp-concat gulp-uglify gulp-htmlmin browser-sync --save -dev
var gulp = require('gulp');
//less自动编译 压缩
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style', function() {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//js合并 混淆压缩
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('true.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//图片复制
gulp.task('images', function() {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//html文件压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//启动一个服务器，监视并自动刷新
var browserSync = require('browser-sync');
gulp.task('serve', function() {
    browserSync({
        server: { baseDir: ['dist'] }

    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch('src/*.html', ['html']);
});
