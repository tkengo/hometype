module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      "lib/jquery-2.0.1.min.js",
      'spec/support/jasmine-jquery.js',
      'spec/support/jasmine-ajax.js',
      'spec/support/mocking.js',
      'spec/support/custom_matcher.js',
      'spec/spec_helper.js',
      "lib/jquery.extend.js",
      "lib/utility.js",
      "lib/dom.js",
      "lib/jp.js",
      "lib/element_wrapper.js",
      "js/constants.js",
      "js/default_option.js",
      "js/options.js",
      "js/key/identifiers.js",
      "js/key/sequence.js",
      "js/key/map.js",
      "js/viewport.js",
      "js/box/select.js",
      "js/box/command.js",
      "js/box/help.js",
      "js/hint/action.js",
      "js/hint/action_map.js",
      "js/hint/letter_conversion.js",
      "js/hint/algorithm/standard.js",
      "js/hint/algorithm/comfortable.js",
      "js/hint/key_factory.js",
      "js/hint/element.js",
      "js/hint/element_collection.js",
      "js/processor/noop.js",
      "js/processor/visual.js",
      "js/processor/command.js",
      "js/processor/hint.js",
      "js/processor/insert.js",
      "js/processor/help.js",
      "js/filter.js",
      "js/executer.js",
      "js/command.js",
      "js/homedics.js",
      "js/mode.js",
      "js/main.js",
      "spec/js/**/*.js",
      "spec/lib/**/*.js",
      {
        pattern: 'spec/fixtures/**/*.html',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'dicts/*.ml',
        watched: false,
        included: false,
        served: true
      }
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
