import {
  def,
  isType
} from './util/index'

const arrayProto = Array.prototype

export const arrayMethods = Object.create(arrayProto)
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach((method) => {
  const originalMethod = arrayProto[method]
  def(arrayMethods, method, function() {
    let i = arguments.length
    const args = new Array(i)
    while(i--) {
      args[i] = arguments[i]
    }
    const result = originalMethod.apply(this, args)
    const ob = this.__ob__
    // observe inserted data if it is observable(object or array)
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    return result
  })
})

export class Observer {
  constructor(v) {
    this.value = v
    def(v, '__ob__', this)
    if (isType(v, 'array')) {

    }
  }
}

export function observe(v) {
  if (!isType(v, 'object') && !isType(v, 'array')) {
    return
  }
  let ob
  if (v['__ob__'] && v['__ob__'] instanceof Observer) {
    ob = v['__ob__']
  } else {
    ob = new Observer(v)
  }
  return ob
}