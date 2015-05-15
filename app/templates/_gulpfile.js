'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var paths = {
	src: 'src',
	dist: 'dist'
};

gulp.task('connect', function() {
	plugins.connect.server({
		port: 3000,
		root: paths.src,
		livereload: true
	});
});

gulp.task('connectReload', function() {
	gulp.src(paths.src + '/*.html')
		.pipe(plugins.connect.reload());
});

gulp.task('sass:dev', function() {
	gulp.src(paths.src + '/sass/**/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			sourceComments: true,
			outputStyle: 'compressed'
		}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.src + '/css'));
});

gulp.task('sass:build', function() {
	gulp.src(paths.src + '/sass/**/*.scss')
		.pipe(plugins.sass({
			sourceComments: false,
			outputStyle: 'compressed'
		}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer('last 2 version'))
		.pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('watch', function() {
	gulp.watch([
		paths.src + '/**/*.html',
		paths.src + '/css/main.css',
		paths.src + '/**/*.js'
	], ['connectReload']);

	gulp.watch(paths.src + '/sass/**/*.scss', ['sass:dev']);
});

gulp.task('wiredep', function() {
	return gulp.src(paths.src + '/index.html')
		.pipe(wiredep())
		.pipe(gulp.dest(paths.src));
});

gulp.task('clean', function() {
	del([paths.dist + '/*']);
});

gulp.task('copy', function() {
	gulp.src(paths.src + '/images/*')
		.pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('usemin', function() {
	gulp.src(paths.src + '/index.html')
		.pipe(plugins.usemin({
			html: [plugins.minifyHtml({empty: true})],
			js: [plugins.uglify()]
		}))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['wiredep', 'sass:dev', 'connect', 'watch']);

gulp.task('build', function(callback) {
	runSequence('clean', 'wiredep', ['copy', 'sass:build', 'usemin'], callback);
});
