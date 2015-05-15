'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var requiredFiles = [
	'bower.json',
	'package.json',
	'.editorconfig',
	'.jshintrc',
	'src/index.html',
	'src/images',
	'src/sass/main.scss',
	'src/sass/_init.scss',
	'src/sass/_mixins.scss',
	'src/sass/_layout.scss',
	'src/sass/_modules.scss',
	'src/css',
	'src/js/main.js',
	'src/partials/home.html'
];

describe('nstatic:app with Gulp', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withOptions({ 'skip-install': true })
			.withPrompts({ buildSystem: 'Gulp' })
			.on('end', done);
	});

	it('creates files with gulpfile.js', function () {
		requiredFiles.push('gulpfile.js');
		assert.file(requiredFiles);
		requiredFiles.pop();
	});

	it('does not contain Gruntfile.js', function() {
		assert.noFile('Gruntfile.js');
	});
});

describe('nstatic:app with Grunt', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withOptions({ 'skip-install': true })
			.withPrompts({ buildSystem: 'Grunt' })
			.on('end', done);
	});

	it('creates files with Gruntfile.js', function () {
		requiredFiles.push('Gruntfile.js');
		assert.file(requiredFiles);
		requiredFiles.pop();
	});

	it('does not contain gulpfile.js', function() {
		assert.noFile('gulpfile.js');
	});
});
