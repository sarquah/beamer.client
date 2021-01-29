// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['spec', 'coverage'],
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: false,      // print the time elapsed for each spec
      failFast: true,             // test would finish with error when a first fail occurs
    },
    fixWebpackSourcePaths: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/' },
        {
          type: 'text',
          check: {
            global: {
              statements: 50,
              branches: 50,
              functions: 50,
              lines: 50
            }
          }
        }
      ]
    }
  });
};
