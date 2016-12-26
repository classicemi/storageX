import storage from '../../../index'

describe('storage', () => {
  it('has a data property', () => {
    expect(Object.keys(storage)).toContain('data')
  })
})