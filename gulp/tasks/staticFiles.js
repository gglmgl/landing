const gulp = require('gulp')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')

module.exports = function staticFiles() {
  return gulp.src("**/{*,.*}", { cwd: "src/img/video" })
    .pipe(plumber())
    .pipe(gulp.dest("build/img/video"));
}
