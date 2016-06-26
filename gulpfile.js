var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 3000
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/sass/**/*.scss'], ['sass', 'html']);
  gulp.watch(['./app/js/**/*.js'], ['html']);
  gulp.watch(['./app/**/**/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
