const toString = Object.prototype.toString

export function isType(o, t) {
  const type = t.toLowerCase()
  return toString.call(o).toLowerCase() === `[object ${type}]`
}