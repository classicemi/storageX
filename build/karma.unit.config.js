const base = require('./karma.base.config.js')

module.exports = function(config) {
  config.set(Object.assign(base, {
    browsers: ['Chrome', 'Firefox'],
    reporters: ['progress']
  }))
}