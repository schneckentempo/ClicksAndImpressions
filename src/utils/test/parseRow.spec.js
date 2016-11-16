import { expect } from 'chai'
import { describe, it } from 'mocha'
import parseRow from '../parseRow'

describe('parseRow parses strings to int on indexes given in the mapping.metrics for a given array', () => {
  it('should return ["a", "1"] when given integers as string', () => {
    const mapping = {
      metrics: [{
        index: 1,
        header: 'metric',
      }],
      dimensions: [{
        index: 0,
        header: 'dimension',
      }],
    }

    expect(parseRow(['a', '1'], mapping)).to.eql(['a', 1])
  })

  it('should return ["a", 1] when given floats as strings', () => {
    const mapping = {
      metrics: [{
        index: 1,
        header: 'metric',
      }],
      dimensions: [{
        index: 0,
        header: 'dimension',
      }],
    }

    expect(parseRow(['a', '1.0'], mapping)).to.eql(['a', 1])
  })
})
