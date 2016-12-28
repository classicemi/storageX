const path = require('path')
const buble = require('rollup-plugin-buble')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * StorageX v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' classicemi\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  'common': {
    entry: path.resolve(__dirname, '../index.js'),
    dest: path.resolve(__dirname, '../dist/storageX.common.js'),
    format: 'cjs',
    banner,
    moduleName: 'Storage',
    plugins: [
      buble()
    ]
  },
  'umd': {
    entry: path.resolve(__dirname, '../index.js'),
    dest: path.resolve(__dirname, '../dist/storageX.js'),
    format: 'umd',
    banner,
    moduleName: 'Storage',
    plugins: [
      buble()
    ]
  }
}

if (process.env.TARGET) {
  module.exports = builds[process.env.TARGET]
} else {
  module.exports = builds
}