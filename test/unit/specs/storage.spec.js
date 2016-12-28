import { Storage } from '../../../src/storage'
import {
  isType
} from '../../../src/util/index'

describe('storage', () => {
  let storage = null
  beforeEach(() => {
    storage = new Storage()
  })

  it('has a data property', () => {
    expect(storage.$data).toBeDefined()
  })
})