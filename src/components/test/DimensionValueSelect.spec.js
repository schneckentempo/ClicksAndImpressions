import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DimensionValueSelect from '../DimensionValueSelect'

const wrapper = shallow(<DimensionValueSelect />)

describe('(Component) DimensionValueSelect', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
