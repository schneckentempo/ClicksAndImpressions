import { expect } from 'chai'
import { describe, it } from 'mocha'
import getSum from '../getSum'

describe('getSum delivers sum of metrics for all given dimensions campaign/channel with the specific name "dimension description 1"', () => {
  it('returns 100', () => {
    const data = [{
      dimension: 'dimension description 1',
      metric: 50,
    }, {
      dimension: 'dimension description 1',
      metric: 50,
    }, {
      dimension: 'dimension description 2',
      metric: 20,
    }]

    const model = {
      campaign: 0,
      metric: 1,
    }

    expect(getSum(data, 'dimension description 1', 'metric', model)).to.equal(100)
  })
})
