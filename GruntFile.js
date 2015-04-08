var port = process.env.PORT || '3000';
var host = process.env.IP || 'localhost';
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-execute');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: port,
                    base: './public'
                }
            }
        },
        typescript: {
            base: {
                src: ['public/**/*.ts'],
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        open: {
            test: {
                path: 'http://localhost:3000/test.html',
                app: 'chrome'
            },
            dev: {
                path: 'http://localhost:3000/index.html',
                app: 'chrome'
            }
        },
        execute: {
            target: {
                src: ['bin/www.js']
            },
            tasks: ['typescript']
        }

    });
    grunt.registerTask('default', ['connect', 'open:dev', 'watch']);
    grunt.registerTask('test', ['connect', 'open:test', 'watch']);
}