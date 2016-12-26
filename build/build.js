const path = require('path')
const rollup = require('rollup')
const fs = require('fs')

let builds = require('./config')

builds = Object.keys(builds).map(name => builds[name])

function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  next()
}

build(builds)

function buildEntry(config) {
  return rollup.rollup(config).then(bundle => {
    const code = bundle.generate(config).code
    return write(config.dest, code)
  })
}

function write(dest, code) {
  return new Promise((resolve, reject) => {
    function report() {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      report()
    })
  })
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}