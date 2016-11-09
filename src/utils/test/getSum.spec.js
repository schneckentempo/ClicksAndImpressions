import { expect } from 'chai'
import { describe, it } from 'mocha'
import getSum from '../getSum'

describe('getSum delivers sum of metrics for all given dimensions campaign/channel with the specific existent name "dimension description 1"', () => {
  it('should return 100', () => {
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

describe('getSum delivers sum of metrics for all given dimensions campaign/channel with the specific existent name "dimension description 2"', () => {
  it('should return 20', () => {
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
})

describe('getSum delivers sum of metrics for all given dimensions campaign/channel with the nonexistent name "dimension description 3"', () => {
  it('should return 0', () => {
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
})

describe('getSum has no metrics to sum up', () => {
  it('should return 0', () => {
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
})

describe('getSum has no campaign/channel defined in the model', () => {
  it('should return 0', () => {
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
