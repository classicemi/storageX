export * from './type'

export function def(o, k, v, e = true) {
  Object.defineProperty(o, k, {
    value: v,
    enumerable: e,
    writable: true,
    configurable: true
  })
}