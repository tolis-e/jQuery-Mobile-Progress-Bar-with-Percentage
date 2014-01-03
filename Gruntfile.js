module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost'
                }
            }
        },
        qunit: {
            progressBar: {
                files: [],
                options: {
                    urls: [
                        "http://localhost:<%= connect.server.options.port %>/tests/index.html"
                    ]
                }
            }
        },
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %><%= "\\n" %>' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright 2014 jQuery Foundation and other contributors<%= "\\n" %>' +
                ' * Released under the MIT license.<%= "\\n" %>' +
                ' * <%= pkg.licenses[0].url + "\\n" %>' +
                ' */' +
                '<%= "\\n" %>'
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= meta.banner %>'
            },
            js: {
                src: ['src/js/tolito-<%= pkg.version %>.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            },
            css: {
                src: ['src/css/tolito-<%= pkg.version %>.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },
        uglify: {
            all: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': [ 'dist/js/<%= pkg.name %>.js' ]
                },
                options: {
                    preserveComments: 'some',
                    sourceMap: 'dist/js/<%= pkg.name %>.js.map',
                    sourceMappingURL: '<%= pkg.name %>.js.map',
                    sourceMapPrefix: 1,
                    beautify: {
                        ascii_only: true
                    }
                }
            },
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true, flatten: true, src: ['src/images/*'], dest: 'dist/images/', filter: 'isFile'
                }]
            },
        },
        jshint: {
            all: {
                src: [ "Gruntfile.js", "src/**/*.js", "tests/**/*.js" ],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['jshint', 'connect', 'qunit:progressBar', 'concat', 'uglify:all', 'cssmin', 'copy']);
};
