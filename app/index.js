'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        // var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the well-made ' + chalk.red('nStatic') + ' generator!'
        ));

        // var prompts = [{
        //     type: 'confirm',
        //     name: 'someOption',
        //     message: 'Would you like to enable this option?',
        //     default: true
        // }];

        // this.prompt(prompts, function (props) {
        //     this.someOption = props.someOption;
        //
        //     done();
        // }.bind(this));
    },

    writing: {
        app: function () {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );
            this.fs.copy(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json')
            );
            this.directory(
                this.templatePath('src'),
                this.destinationPath('src')
            );
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
        }
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
