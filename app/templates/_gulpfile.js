var combiner = require('stream-combiner2');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');


var jshint = require('gulp-jshint');

var stylish = require('jshint-stylish');

var requirejsOptimize = require('gulp-requirejs-optimize');

var fs = require('fs');

var md5 = require("gulp-md5-assets");

var _src = 'app';
var _tar = 'dist';
var paths = {
    scripts: [_src + '/javascripts/*.js', '!' + _src +'/javascripts/_*'],


    sass: [_src + '/sass/*.scss', '!' + _src +'/sass/_*'],
    css: [_src + '/css/*.css', '!' + _src +'/css/_*'],

    destScripts:_tar + '/jsmin',
    destLess:_tar + '/cssmin',
    tmpl:_src + "/*.html",
    destTmpl:_tar
};
var gulp_md5= {
    css:function(){
        console.log('start md5');
        gulp.src(paths.destLess+"/*.css")
        .pipe(md5(10,'./'+_tar+'/*.html'))
    },
    js:function(){

        gulp.src(paths.destScripts+"/*.js")
        .pipe(md5(10,'./'+_tar+'/*.html'))

    }
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


    <% if (css=='sass') { %> 

    var sass = require('gulp-sass');
    
    var minifyCSS = require('gulp-minify-css');
    
    gulp.task('sass', function () {
    
        var combined = combiner.obj([
            gulp.src(paths.sass), sass(),
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

    <% } %>
    <% if (css=='cssnext') { %> 
    var postcss = require('gulp-postcss');
    gulp.task('css', function () {
        var combined = combiner.obj([
            gulp.src(paths.css),
            postcss([
                require("postcss-import")(),
                require("postcss-mixins")(),
                require("postcss-simple-vars")(),
                require("postcss-nesting")(),
                require("postcss-cssnext")({
                  warnForDuplicates: false
                }),
                require("cssnano")()
            ]),
            rename(function(path){
                path.extname = ".min.css";
            }),
            gulp.dest(paths.destLess)
        ]);
    
        combined.on('error', console.error.bind(console));
        return combined;
    });
    <% } %>


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

    combined.on('end',function(){
        gulp_md5.css();
        gulp_md5.js();
    });



    return combined;
});

gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['scripts']);

    <% if (css=='cssnext') { %> 
    gulp.watch(paths.css, ['css']);
    <% } %>

    <% if (css=='sass') { %> 
    gulp.watch(paths.sass, ['sass']);
    <% } %>

    gulp.watch(paths.tmpl, ['tmpl']);

    gulp.watch(paths.destLess+'/*.css',['tmpl']);

    gulp.watch(paths.destScripts+'/*.js',['tmpl']);

});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['tmpl','watch']);

var connect = require('connect');
var serveStatic = require('serve-static');
console.log(__dirname + '/' + _tar + '/');
connect().use(serveStatic(__dirname + '/' + _tar + '/')).listen(8080, function(){
    console.log('Server running on 8080..., Please edit app dir');
});







