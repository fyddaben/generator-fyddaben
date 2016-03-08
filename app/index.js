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
            'Welcome to the great ' + chalk.red('Fyddaben') + ' generator!'
        ));

        var prompts = [{
            name: 'name',
            message: '项目名字？',
            default:'nothing' 
        },{
            name: 'css',
            message: '使用less还是sass？',
            default:'sass' 
        }];
        
        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.css = props.css;
            // To access props later use this.props.someOption;
            done();
        }.bind(this));
    },

    writing: function () {
        //复制配置文件
        
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { name: this.name, css:this.css }
        );
        this.copy(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json')
        );
        this.copy(
            this.templatePath('_editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.copy(
            this.templatePath('_jshintrc'),
            this.destinationPath('.jshintrc')
        );
        this.fs.copyTpl(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            { css: this.css }
        );
        var _src = '_app';
        var _tar = '_build';
        var src = 'app';
        var tar = 'build';

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
        if(this.css==='less'){
            mkdirp(src + "/less");
            mkdirp(src + "/less/_common");
            this.copy(
                this.templatePath(_src + '/less/_common/mixin.less'),
                this.destinationPath(src + '/less/_common/mixin.less')
            ); 
            this.copy(
                this.templatePath(_src + '/less/index.less'),
                this.destinationPath(src + '/less/index.less')
            );
            this.copy(
                this.templatePath(_src + '/less/_common/reset.less'),
                this.destinationPath(src + '/less/_common/reset.less')
            );
        }else{
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
        
        
        this.fs.copyTpl(
            this.templatePath(_src + '/index.html'),
            this.destinationPath(src + '/index.html'),
            { title: this.name }
        ); 
    },
    install: function () {
        //this.installDependencies();
        console.log("正在安装环境依赖...");
        var process = require('child_process');
        process.exec('npm install --registry=https://registry.npm.taobao.org \
                     --cache=~/.npm/.cache/cnpm \
                     --disturl=https://npm.taobao.org/dist \
                     --userconfig=~/.cnpmrc',function(error,stdout,stderr){
                        if(error!== null){
                            console.log('exec error: ' + error+",手动执行 cnpm install 安装吧"); 
                        }else{
                            console.log('ok,可以开始工作了');
                        } 
                     });
    }
});
