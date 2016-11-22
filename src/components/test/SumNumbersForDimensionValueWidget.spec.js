import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { SumNumbersForDimensionValueWidget } from '../SumNumbersForDimensionValueWidget'

const wrapper = shallow(<SumNumbersForDimensionValueWidget mapping={{}} />)

describe('(Component) SumNumbersForDimensionValueWidget', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
