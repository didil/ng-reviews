module.exports = function (karma) {
  karma.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      <% scripts.forEach( function ( file ) { %>'<%= file %>',
        <% }); %>
      'src/**/*.js',
      'src/**/*.coffee',
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'mocha','sinon-chai' ],
    plugins: [ 'karma-mocha', 'karma-sinon-chai', 'karma-chrome-launcher','karma-coverage' ],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
      },


    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',
    autoWatch: false,
    browsers: [
      'Chrome'
    ]
  });
};