'use strict';

var modRewrite = require('connect-modrewrite');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        app: {
            src: 'src',
            dist: 'dist',
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    livereload: 35729,
                    open: false,
                    base: '<%= app.src %>',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')(),
                            modRewrite(['^[^\\.]*$ /index.html [l]']),
                            connect.static(options.base[options.base.length - 1])
                        ];
                    }
                }
            }
        },

        clean: {
            start: {
                src: [
                    '<%= app.dist %>/*',
                    '.tmp',
                    '.sass-cache'
                ]
            },
            end: {
                src: [
                    '.tmp',
                    '.sass-cache'
                ]
            }
        },

        copy: {
            build: {
                expand: true,
                cwd: '<%= app.src %>',
                dest: '<%= app.dist %>',
                src: [
                    '**/*.html',
                    'images/*'
                ]
            }
        },

        sass: {
            dev: {
                files: {
                    '<%= app.src %>/css/main.css': '<%= app.src %>/sass/main.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= app.dist %>/css/main.css': '<%= app.src %>/sass/main.scss'
                }
            }
        },

        watch: {
            scss: {
                files: ['<%= app.src %>/sass/**/*.scss'],
                tasks: ['sass:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.server.options.livereload %>'
                },
                files: [
                    '<%= app.src %>/**/*.{html,css,js,png,jpg,jpeg,gif,svg}'
                ]
            }
        },

        wiredep: {
            task: {
                src: [
                    '<%= app.src %>/**/*.html'
                ]
            }
        },

        useminPrepare: {
            html: '<%= app.src %>/index.html',
            options: {
                dest: '<%= app.dist %>'
            }
        },

        usemin: {
            html: ['<%= app.dist %>/**/*.html'],
            options: {
                dest: '<%= app.dist %>'
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>',
                    src: '**/*.html',
                    dest: '<%= app.dist %>'
                }]
            }
        }
    });

    grunt.registerTask('dev', [
        'connect',
        'sass:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:start',
        'wiredep',
        'copy',
        'sass:build',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'usemin',
        'htmlmin:build',
        'clean:end'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
