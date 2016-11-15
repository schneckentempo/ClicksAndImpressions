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
      metrics: [{
        index: 1,
        header: 'metric',
      }],
      dimensions: [{
        index: 0,
        header: 'dimension',
      }],
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
      metrics: [{
        index: 1,
        header: 'metric',
      }],
      dimensions: [{
        index: 0,
        header: 'dimension',
      }],
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
      metrics: [{
        index: 1,
        header: 'metric',
      }],
      dimensions: [{
        index: 0,
        header: 'dimension',
      }],
    }

    expect(getSum(data, 'dimension description 3', 'metric', model)).to.equal(0)
  })
})
