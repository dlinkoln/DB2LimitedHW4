const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const autoprefixer = require("gulp-autoprefixer");
const pipeline = require("readable-stream").pipeline;
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./src/sass/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(concat("all.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}
function compressJS() {
  return pipeline(gulp.src("src/js/**/*.js"), uglify(), gulp.dest("dist/js"));
}
function template() {
  return gulp
    .src("./src/*.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/sass/**/*.sass", style);
  gulp.watch("./src/*.pug", template);
}
async function build() {
  await style();
  await template();
  await compressJS();
}

exports.style = style;
exports.template = template;
exports.compressJS = compressJS;
exports.watch = watch;
exports.build = build;
