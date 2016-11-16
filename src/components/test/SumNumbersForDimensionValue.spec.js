import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SumNumbersForDimensionValue from '../SumNumbersForDimensionValue'

const wrapper = shallow(<SumNumbersForDimensionValue metrics={[]} />)

describe('(Component) SumNumbersForDimensionValue', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
