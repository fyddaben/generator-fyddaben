var combiner = require('stream-combiner2');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var less = require('gulp-less');

var rename = require('gulp-rename');

var minifyCSS = require('gulp-minify-css');

var jshint = require('gulp-jshint');

var stylish = require('jshint-stylish');

var requirejsOptimize = require('gulp-requirejs-optimize');

var fs = require('fs');


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
        jshint(),
        jshint.reporter(stylish),
        requirejsOptimize(function(file){

            return {
                // Avoid inserting define() placeholder
                skipModuleInsertion: true,
                // Avoid breaking semicolons inserted by r.js
                skipSemiColonInsertion: true
            };
        }),
        uglify(),
        rename(function(path){
            path.extname = ".min.js";

        }),
        gulp.dest(paths.destScripts),
        rename(function(path){
            var tarPath= __dirname+'/'+paths.destScripts+'/'+path.basename+path.extname;
            var data= fs.readFileSync(tarPath,'utf8');
            var regex = /require[(].*?[)][,]/;
            if(regex.test(data)){
                var code= data.replace(regex,'');
                fs.writeFile(tarPath,code,function(err){
                    if(err){
                        console.log(err);
                    }
                });
            }
        })


    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));
    return combined;

});

gulp.task('less', function () {

    var combined = combiner.obj([
        gulp.src(paths.less), less(),
        minifyCSS(),
        rename(function(path){
            path.extname = ".min.css"
        }),
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
gulp.task('default', ['scripts','tmpl','less','watch']);

