import { expect } from 'chai'
import { describe, it } from 'mocha'
import getColumn from '../getColumn'

describe('getColumn delivers name of prop found at the given index of the model', () => {
  it('should return "first"', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'firstcol', { firstcol: 0 })).to.equal('first'))
})

describe('getColumn delivers name of prop found at the given index of the model', () => {
  it('should return "second"', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'secondcol', { firstcol: 0, secondcol: 1 })).to.equal('second'))
})

describe('getColumn delivers error when asked for a nonexistent prop of the model', () => {
  it('should return ""', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'thirdcol', { firstcol: 0, secondcol: 1 })).to.throw(Error))
})

describe('getColumn delivers error when asked for a nonexistent prop of the dataset', () => {
  it('should return ""', () =>
    expect(getColumn({ }, 'firstcol', { firstcol: 0, secondcol: 1 })).to.throw(Error))
})
