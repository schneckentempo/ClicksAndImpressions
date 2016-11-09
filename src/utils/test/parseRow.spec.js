import { expect } from 'chai'
import { describe, it } from 'mocha'
import parseRow from '../parseRow'

describe('parseRow parses strings to int on index 2 and 3 for a given array (attention: we dont respect a model here)', () => {
  it('should return ["a", "b", 1, 2]', () =>
    expect(parseRow(['a', 'b', '1', '2'])).to.eql(['a', 'b', 1, 2]))
})
