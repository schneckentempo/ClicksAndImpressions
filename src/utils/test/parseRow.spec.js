import { expect } from 'chai'
import { describe, it } from 'mocha'
import parseRow from '../parseRow'

describe('parseRow parses strings to int on index 2 and 3 for a given array (attention: we dont respect a model here)', () => {
  it('should return ["a", "b", 1, 2] when given integers as string', () =>
    expect(parseRow(['a', 'b', '1', '2'])).to.eql(['a', 'b', 1, 2]))

  it('should return ["a", "b", 1, 2] when given floats as strings', () =>
      expect(parseRow(['a', 'b', '1.0', '2.0'])).to.eql(['a', 'b', 1, 2]))

  it('should return an error when given a NaN at index 3 or 4', () =>
      expect(() => parseRow(['a', 'b', 'y', 'z'])).to.throw(Error))

  it('or should return strings as strings after checking if there is a number to parse', () =>
      expect(() => parseRow(['a', 'b', 'y', 'z'])).to.eql(['a', 'b', 'y', 'z']))
})
