module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/lib/jasmine-2.0.0/jasmine.js',
      'spec/lib/jasmine-2.0.0/jasmine-html.js',
      'spec/lib/jasmine-2.0.0/boot.js',
      'lib/jquery-2.0.1.min.js',
      'spec/lib/mocking.js',
      'spec/lib/custom_matcher.js',
      'spec/spec_helper.js',
      'js/options.js',
      'spec/**/*.js'
    ],
    exclude: [ ],
    preprocessors: {
     'js/**/*.js': [ 'coverage' ]
    },
    reporters: [
      'progress',
      'coverage'
    ],
    coverageReporter: {
      type: 'html',
      dir : 'coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
