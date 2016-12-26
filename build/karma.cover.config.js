const base = require('./karma.base.config.js')

module.exports = function(config) {
  const options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' }
      ]
    },
    singleRun: true
  })

  options.webpack.babel = {
    plugins: [['istanbul', {
      exclude: [
        'test/'
      ]
    }]]
  }

  config.set(options)
}