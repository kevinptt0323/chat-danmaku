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
    entries: `${__dirname}/src/options/index.js`,
    transform: [babelify],
  })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(`${__dirname}/extension/options`));
});

gulp.task('build:css', () => {
  gulp.src(`${__dirname}/src/index.less`)
    .pipe(less())
    .pipe(gulp.dest(`${__dirname}/extension/`));

  gulp.src(`${__dirname}/src/options/index.less`)
    .pipe(less())
    .pipe(gulp.dest(`${__dirname}/extension/options`));
})

gulp.task('static', () => {
  gulp.src(`${__dirname}/icons/**`)
    .pipe(gulp.dest(`${__dirname}/extension/icons`));
  gulp.src(`${__dirname}/lib/**`)
    .pipe(gulp.dest(`${__dirname}/extension/lib`));
  gulp.src(`${__dirname}/src/_locales/**`)
    .pipe(gulp.dest(`${__dirname}/extension/_locales`));
  gulp.src(`${__dirname}/src/manifest.json`)
    .pipe(gulp.dest(`${__dirname}/extension/`));
  gulp.src(`${__dirname}/src/options/index.html`)
    .pipe(gulp.dest(`${__dirname}/extension/options`));
});

gulp.task('build', ['build:js', 'build:css', 'static']);
