var combiner = require('stream-combiner2');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var less = require('gulp-less');

var rename = require('gulp-rename');

var paths = {
    scripts: ['build/javascripts/*.js', '!build/javascripts/_*'],
    less: ['build/less/*.less', '!build/less/_*'],
    destScripts:'app/jsmin',
    destLess:'app/cssmin',
    tmpl:"build/*.html",
    destTmpl:"app"
};


gulp.task('scripts', function () {

    var combined = combiner.obj([
        gulp.src(paths.scripts),
        uglify(),
        gulp.dest(paths.destScripts)
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));
    return combined;

});

gulp.task('less', function () {

    var combined = combiner.obj([
        gulp.src(paths.less),
        less(),
        gulp.dest(paths.destLess)
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('tmpl', function () {

    var combined = combiner.obj([
        gulp.src(paths.tmpl),
        rename(function(path){
            path.dirname += "";
            path.basename += "";
        }),
        gulp.dest(paths.destTmpl)
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.tmpl, ['tmpl']);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);

