import { describe, it, expect } from 'vitest'

import obj from './teste'

describe('Example', () => {
  it('should be an example', () => {
    expect(obj.a).toEqual(10)
  })
})
