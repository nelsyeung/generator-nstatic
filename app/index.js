'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to ' + chalk.red('nStatic') + ' generator, where everything is nice, neat and minimal.'
		));

		var prompts = [{
			type: 'list',
			name: 'buildSystem',
			message: 'Would you like to use Gulp or Grunt?',
			choices: ['Gulp', 'Grunt'],
			default: 0
		}];

		this.prompt(prompts, function(props) {
			this.buildSystem = props.buildSystem;

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			if (this.buildSystem === 'Gulp') {
				this.fs.copy(
					this.templatePath('_package-gulp.json'),
					this.destinationPath('package.json')
				);
				this.fs.copy(
					this.templatePath('_gulpfile.js'),
					this.destinationPath('gulpfile.js')
				);
			}
			else {
				this.fs.copy(
					this.templatePath('_package-grunt.json'),
					this.destinationPath('package.json')
				);
				this.fs.copy(
					this.templatePath('_Gruntfile.js'),
					this.destinationPath('Gruntfile.js')
				);
			}
			this.fs.copy(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json')
			);
			this.directory(
				this.templatePath('src'),
				this.destinationPath('src')
			);

			this.mkdir('src/images');
			this.mkdir('src/css');

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
