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
            message: '名字',
            default:'nothing' 
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            // To access props later use this.props.someOption;
            done();
        }.bind(this));
    },

    writing: function () {
        //复制配置文件
        
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { name: this.name }
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
        this.copy(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js')
        ); 
        //复制结果文件
        mkdirp("app");
        mkdirp("app/cssmin");
        mkdirp("app/jsmin");
        mkdirp("app/jsmin/_lib");
        this.copy(
            this.templatePath('app/jsmin/_lib/jquery.min.js'),
            this.destinationPath('app/jsmin/_lib/jquery.min.js')
        );
        this.copy(
            this.templatePath('app/jsmin/_lib/doT.min.js'),
            this.destinationPath('app/jsmin/_lib/doT.min.js')
        );
        
        //复制工作区文件
        mkdirp("build");
        mkdirp("build/less");
        mkdirp("build/less/_common");
        mkdirp("build/javascripts");
        this.copy(
            this.templatePath('build/less/_common/mixin.less'),
            this.destinationPath('build/less/_common/mixin.less')
        );
        this.copy(
            this.templatePath('build/javascripts/index.js'),
            this.destinationPath('build/javascripts/index.js')
        );
        this.copy(
            this.templatePath('build/less/index.less'),
            this.destinationPath('build/less/index.less')
        );
        this.copy(
            this.templatePath('build/less/_common/reset.less'),
            this.destinationPath('build/less/_common/reset.less')
        );
        this.fs.copyTpl(
            this.templatePath('build/index.html'),
            this.destinationPath('build/index.html'),
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
                            console.log('exec error: ' + error+",手动执行 npm install 安装吧"); 
                        }else{
                            console.log('ok,可以开始工作了');
                        } 
                     });
    }
});
