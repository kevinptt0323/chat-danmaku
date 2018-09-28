const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');

gulp.task('build:js', () => {
  browserify({
    entries: `${__dirname}/src/index.js`,
    transform: [babelify],
  })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(`${__dirname}/extension/`));

  browserify({
    entries: `${__dirname}/src/options.js`,
    transform: [babelify],
  })
    .bundle()
    .pipe(source('options.js'))
    .pipe(gulp.dest(`${__dirname}/extension/`));
});

gulp.task('build:css', () => {
  gulp.src(`${__dirname}/src/index.less`)
    .pipe(less())
    .pipe(gulp.dest(`${__dirname}/extension/`));

  gulp.src(`${__dirname}/src/options.less`)
    .pipe(less())
    .pipe(gulp.dest(`${__dirname}/extension/`));
})

gulp.task('build', ['build:js', 'build:css']);
