
module.exports = function(grunt) {
  require('time-grunt')(grunt);

  var config = require('./.screeps.json')

  grunt.loadNpmTasks('grunt-screeps')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-jsbeautifier')
  
  var currentdate = new Date();

  grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
  grunt.log.writeln('Branch: ' + config.branch)

  grunt.initConfig({
      screeps: {
          options: {
              server: {
                  host: config.host,
                  port: config.port,
                  http: true
              },
              email: config.userName,
              password: config.password,
              branch: config.branch,
              ptr: config.ptr
          },
          dist: {
              src: ['dist/*.js']
          }
      },

      clean: {
          'dist': ['dist']
      },

      copy: {
          // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // Change the path name utilize underscores for folders
                return dest + src.replace(/\//g,'_');
              }
            }],
          }
      },

      jsbeautifier: {
          modify: {
            src: ["src/**/*.js"],
            options: {
            }
          },
          verify: {
            src: ["src/**/*.js"],
            options: {
              mode: 'VERIFY_ONLY'
            }
          }
      }
  })

    grunt.registerTask('default',       ['jsbeautifier:verify', 'clean', 'copy:screeps', 'screeps']);
    grunt.registerTask('uploadPretty',  ['jsbeautifier:modify', 'clean', 'copy:screeps', 'screeps']);
    grunt.registerTask('noTest',        ['clean', 'copy:screeps', 'screeps']);
    grunt.registerTask('test',          ['jsbeautifier:verify']);
    grunt.registerTask('pretty',        ['jsbeautifier:modify']);
    grunt.registerTask('copyOnly',          ['clean', 'copy:screeps']);
}