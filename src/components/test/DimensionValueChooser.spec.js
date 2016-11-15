import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DimensionValueChooser from '../DimensionValueChooser'

const wrapper = shallow(<DimensionValueChooser options={[]} />)

describe('(Component) DimensionValueChooser', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
