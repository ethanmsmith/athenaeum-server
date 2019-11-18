import * as gulp from 'gulp';
import { watch, task, series } from 'gulp';
import nodemon from 'nodemon';
import ts from 'gulp-typescript';
import ansi from 'ansi-colors';

let log = require('fancy-log');

let tsProject = ts.createProject('tsconfig.json');

nodemon({
  script: 'dist/index.js',
  ext: 'js json'
});

task('build', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

// Watch for any changes in TypeScript source/test files and builds if changes
task('shallow watch', function () {
  return watch(['src/**/*.ts', 'test/**/*.ts'])
    .on('change', file => {
      gulp
        .src(file)
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
    });
});

task('watch', () => {
  return watch(['src/**/*.ts', 'test/**/*.ts'], gulp.task('build'));
});

// Start livereload server. Nodemon watches for changes on the index.js file
task('nodemon', function (cb) {
  nodemon.on('start', function () {
    log(ansi.cyan('Started server'));
  }).on('quit', function () {
    log.warn('Quit server');
    process.exit();
  }).on('restart', function (files: string[]) {
    // Changelog
    log(ansi.cyan('Restarting server...'));
    log(`Modified file${files.length === 1 ? '' : 's'}: ${files.length === 1 ? ansi.magenta(files[0]) : '' }`);
    files.slice(1).map(file => log(`\t${ansi.magenta(file)}`));
  });
  cb();
});

exports.serve = series('build', 'nodemon', 'watch');
exports.default = series('build', 'nodemon', 'shallow watch');