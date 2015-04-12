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
            message: '名字?',
            default:'AppForNobody' 
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            // To access props later use this.props.someOption;
            done();
        }.bind(this));
    },

    writing: function () {
        //复制配置文件
        this.copy(
            this.templatePath('_package.json'),
            this.destinationPath('package.json')
        );
        this.copy(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json')
        );
        this.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
        );
        this.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        ); 
        //复制结果文件
        mkdirp("app");
        mkdirp("app/cssmin");
        mkdirp("app/jsmin");
        this.copy(
            this.templatePath('app/jsmin/jquery.min.js'),
            this.destinationPath('app/jsmin/jquery.min.js')
        );
        this.copy(
            this.templatePath('app/jsmin/doT.min.js'),
            this.destinationPath('app/jsmin/doT.min.js')
        );
        //复制工作区文件
        mkdirp("build");
        mkdirp("build/less");
        mkdirp("build/less/_common");
        mkdirp("build/javascripts");
        mkdirp("build/javascripts/_libs");
        this.copy(
            this.templatePath('build/less/_common/mixin.less'),
            this.destinationPath('build/less/_common/mixin.less')
        );
        this.copy(
            this.templatePath('build/index.html'),
            this.destinationPath('build/index.html')
        );
        
        this.fs.copyTpl(
            this.templatePath('build/index.html'),
            this.destinationPath('build/index.html'),
            { title: this.name }
        );
        this.copy(
            this.templatePath('build/less/_common/reset.less'),
            this.destinationPath('build/less/_common/reset.less')
        );
 
    },

    install: function () {
        this.installDependencies();
    }
});
