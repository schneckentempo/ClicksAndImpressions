import { expect } from 'chai'
import { describe, it } from 'mocha'
import getColumn from '../getColumn'

describe('getColumn delivers name of prop found at the given index of the model', () => {
  it('should return "first"', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'firstcol', { firstcol: 0 })).to.equal('first'))

  it('should return "second"', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'secondcol', { firstcol: 0, secondcol: 1 })).to.equal('second'))

  it('should deliver an error when asked for a nonexistent prop of the model', () =>
    expect(getColumn({ first: 'test', second: 'test' }, 'thirdcol', { firstcol: 0, secondcol: 1 })).to.throw(Error))

  it('should deliver an error when asked for a nonexistent prop of the data', () =>
    expect(getColumn({ }, 'firstcol', { firstcol: 0, secondcol: 1 })).to.throw(Error))
})
