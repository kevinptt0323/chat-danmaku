const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');

const expose = {
  'jquery': '$',
  'componentHandler': 'componentHandler',
};

gulp.task('build:js', () => {
    const entry = `${__dirname}/src/index.js`;
    const stream = browserify({
        entries: entry,
        transform: [babelify],
    })
        .transform('exposify', { expose })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(`${__dirname}/extension/`));
});

gulp.task('build:css', () => {
    const entry = `${__dirname}/src/index.less`;
    gulp.src(entry)
        .pipe(less())
        .pipe(gulp.dest(`${__dirname}/extension/`));
})

gulp.task('build', ['build:js', 'build:css']);
