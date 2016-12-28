import * as utils from '../../../src/util'

describe('utils', () => {
  it('tells types', () => {
    const s = 'string'
    const o = { foo: 'bar' }
    const n = 123
    const a = [1, 2, 3]

    expect(utils.isType(s, 'string')).toBeTruthy()
    expect(utils.isType(o, 'object')).toBeTruthy()
    expect(utils.isType(n, 'number')).toBeTruthy()
    expect(utils.isType(a, 'array')).toBeTruthy()
    expect(utils.isType(s, 'object')).toBeFalsy()
    expect(utils.isType(o, 'string')).toBeFalsy()
    expect(utils.isType(n, 'array')).toBeFalsy()
    expect(utils.isType(a, 'number')).toBeFalsy()
  })
})