'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    console.log("ss1");
  },

  prompting: function () {
    var done = this.async();

    console.log("ss2");
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the great ' + chalk.red('Fyddaben') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
        this.props = props;
        // To access props later use this.props.someOption;

        console.log("ss3");
        done();
    }.bind(this));
  },

  writing: {
    app: function () {
        console.log("ss4");
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
        console.log("ss5");
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
        console.log("ss6");
    this.installDependencies();
  }
});
