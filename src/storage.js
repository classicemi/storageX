import {
  observe
} from './observer'
import {
  isType
} from './util/index'

const defaultOptions = {
  data: {}
}

function walk(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

export function defineReactive(obj, key, val) {
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  const getter = property && property.getter
  const setter = property && property.setter

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      const value = getter ? getter.call(obj) : val
      return value
    },
    set: function(newValue) {
      const oldValue = getter ? getter.call(obj) : val
      if (newValue === oldValue) {
        return
      }
      if (setter) {
        setter.call(obj, newValue)
      } else {
        val = newValue
      }
      observe(newValue)
    }
  })
}

export class Storage {
  constructor(options) {
    this.$options = mergeOptions(defaultOptions, options || {})
    this.$data = this.$options.data
    walk(this.$data)
  }

  /**
   * get storage size
   * @return {Number} size of the storage data
   */
  size() {
    return Object.keys(this.$data).length
  }

  /**
   * hash methods
   */
  /**
   * sets field in the hash stored at key to value
   * @param  {String} k key
   * @param  {any}    v value
   * @return {Object}   Storage instance
   */
  hset(k, v) {
    this.$data[k] = v
    return this
  }

  /**
   * returns the value associated with field in the hash stored at key
   * @param  {String} k key
   * @return {any}      value 
   */
  hget(k) {
    return this.$data[k]
  }
}

function mergeOptions(defaultOptions, options) {
  const o = {}
  Object.keys(defaultOptions).forEach((k) => {
    o[k] = options[k] ? options[k] : defaultOptions[k]
  })
  return o
}