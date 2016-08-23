'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the great ' + chalk.red('fyddaben') + ' generator!'
        ));

        var prompts = [{
            name: 'name',
            message: '项目名字？',
            default:'nothing' 
        },{
            name: 'css',
            message: '使用cssnext还是sass？',
            default:'sass' 
        },{
            name: 'pf',
            message: 'm端还是pc端？',
            default:'pc' 
        }];
        
        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.css = props.css;
            this.pf = props.pf;
            
            // To access props later use this.props.someOption;
            done();
        }.bind(this));
    },

    writing: function () {
        // 首先建立文件夹
        mkdirp(this.name);  

        //复制配置文件
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath(this.name + '/package.json'),
            { name: this.name, css:this.css }
        );
        this.copy(
            this.templatePath('_bower.json'),
            this.destinationPath(this.name + '/bower.json')
        );
        this.copy(
            this.templatePath('_editorconfig'),
            this.destinationPath(this.name + '/.editorconfig')
        );
        this.copy(
            this.templatePath('_jshintrc'),
            this.destinationPath(this.name + '/.jshintrc')
        );
        this.fs.copyTpl(
            this.templatePath('_gulpfile.js'),
            this.destinationPath(this.name + '/gulpfile.js'),
            { css: this.css }
        );
        var _src = '_app';
        var _tar = '_build';
        var src = this.name + '/app';
        var tar = this.name + '/dist';

        //复制结果文件
        mkdirp(tar);
        mkdirp(tar + "/cssmin");
        mkdirp(tar + "/jsmin");
        mkdirp(tar + "/jsmin/_lib");
        this.copy(
            this.templatePath(_tar + '/jsmin/_lib/jquery.min.js'),
            this.destinationPath(tar + '/jsmin/_lib/jquery.min.js')
        );
        this.copy(
            this.templatePath(_tar + '/jsmin/_lib/doT.min.js'),
            this.destinationPath(tar + '/jsmin/_lib/doT.min.js')
        );
        
        //复制工作区文件
        mkdirp(src);
        mkdirp(src + "/javascripts");
        if(this.css==='cssnext'){
            mkdirp(src + "/css");
            mkdirp(src + "/css/_common");
            this.copy(
                this.templatePath(_src + '/css/_common/mixin.css'),
                this.destinationPath(src + '/css/_common/mixin.css')
            ); 
            this.copy(
                this.templatePath(_src + '/css/index.css'),
                this.destinationPath(src + '/css/index.css')
            );
            this.copy(
                this.templatePath(_src + '/css/_common/reset.css'),
                this.destinationPath(src + '/css/_common/reset.css')
            );
        }
        if (this.css==='sass'){
            mkdirp(src + "/sass");
            mkdirp(src + "/sass/_common");
            this.copy(
                this.templatePath(_src + '/sass/index.scss'),
                this.destinationPath(src + '/sass/index.scss')
            );
            this.copy(
                this.templatePath(_src + '/sass/_common/mixin.scss'),
                this.destinationPath(src + '/sass/_common/mixin.scss')
            );
            this.copy(
                this.templatePath(_src + '/sass/_common/reset.scss'),
                this.destinationPath(src + '/sass/_common/reset.scss')
            );
        }
        
        this.copy(
            this.templatePath(_src + '/javascripts/index.js'),
            this.destinationPath(src + '/javascripts/index.js')
        );
        
        if (this.pf == 'pc') {
            this.fs.copyTpl(
                this.templatePath(_src + '/index.html'),
                this.destinationPath(src + '/index.html'),
                { title: this.name }
            ); 
        } else {
            this.fs.copyTpl(
                this.templatePath(_src + '/mobile.html'),
                this.destinationPath(src + '/mobile.html'),
                { title: this.name }
            ); 
        }
    },
    install: function () {
        //this.installDependencies();
        console.log("正在安装环境依赖...");
        var process = require('child_process');
        
        var child = process.exec('cd ' + this.name + ' && npm install \
                                 --registry=https://registry.npm.taobao.org \
                                 --cache=~/.npm/.cache/cnpm \
                                 --disturl=https://npm.taobao.org/dist \
                                 --userconfig=~/.cnpmrc');
        child.stdout.on('data', function(data) {
            console.log('out: ' + data);
        });
        child.stderr.on('data', function(data) {
            console.log('warn: ' + data);
        });
        child.on('close', function(code) {
            console.log('ok,可以开始工作了');
        });

    }
});
