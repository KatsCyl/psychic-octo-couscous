# Gruntfile.coffee

# our wrapper function (required by grunt and its plugins)
# all configuration goes inside this function

module.exports = (grunt) =>

  # ===========================================================================
  # CONFIGURE GRUNT ===========================================================
  # ===========================================================================
  grunt.initConfig
    # get the configuration info from package.json ----------------------------
    # this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json')


    coffeelint:
      app: [ 'src/*.coffee', 'src/*/*.coffee' ]

    uglify:
      build:
        files:
          'dist/js/main.min.js': 'dist/js/main.js'

    coffee:
      compileJoined:
        options:
          join: true
        files:
          'dist/js/main.js': ['src/*.coffee', 'src/*/*.coffee']

    copy:
      main:
        src: 'default.htm'
        dest: 'dist/default.htm'
      js:
        expand: true
        flatten: true
        src: 'src/js_libs/*.js'
        dest: 'dist/js/libs/'
      assets:
        expand: true
        cwd: 'src/'
        src: 'assets/**'
        dest: 'dist/'


    htmllint:
      all: ['default.htm']

    watch:
      gruntfile:
        files: 'Gruntfile.coffee'
        tasks: ['coffeelint']
      html:
        files: 'default.htm'
        tasks: ['htmllint', 'copy']
      scripts:
        files: ['src/*.coffee', 'src/*/*.coffee']
        tasks: ['coffeelint', 'coffee']
      js:
        files: ['src/js_libs/*.js']
        tasks: ['copy:js']
    
      
  grunt.registerTask 'make', ['htmllint', 'copy', 'coffeelint', 'coffee']


    # all of our configuration will go here

  # ===========================================================================
  # LOAD GRUNT PLUGINS ========================================================
  # ===========================================================================
  # we can only load these if they are in our package.json
  # make sure you have run npm install so our app can find these

  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-html'



