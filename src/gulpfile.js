const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('babelify-server', function () {
    gulp.src('server.js')
          .pipe(sourcemaps.init())
          .pipe(babel({
              presets: ['env']
          }))
          .pipe(concat('server.js'))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('../build/src'))
});

gulp.task('babelify-routes', function () {
    gulp.src('./routes/*.js')
          .pipe(sourcemaps.init())
          .pipe(babel({
              presets: ['env']
          }))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('../build/src/routes'))
});
