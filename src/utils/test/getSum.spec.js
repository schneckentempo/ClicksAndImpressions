import { expect } from 'chai'
import { describe, it } from 'mocha'
import getSum from '../getSum'

describe('getSum delivers sum of metrics for all given dimensions campaign/channel with the specific existent name', () => {
  it('should return 100 for "dimension description 1"', () => {
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

  it('should return 20 for "dimension description 2"', () => {
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

    expect(getSum(data, 'dimension description 2', 'metric', model)).to.equal(20)
  })

  it('should return 0 for "dimension description 3"', () => {
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

    expect(getSum(data, 'dimension description 3', 'metric', model)).to.equal(0)
  })

  it('should return 0 when there are no metrics to sum up', () => {
    const data = [{
      dimension: 'dimension description 1',
      metric: 50,
    }]

    const model = {
      campaign: 0,
      metric: 1,
    }

    expect(getSum(data, 'dimension description 1', 'nonexistentmetric', model)).to.equal(0)
  })

  it('should return 0 if it has no campaign/channel defined in the model', () => {
    const data = [{
      dimension: 'dimension description 1',
      metric: 50,
    }]

    const model = {
      thisIsNoCampaign: 0,
      metric: 1,
    }

    expect(getSum(data, 'dimension description 1', 'metric', model)).to.equal(0)
  })
})
