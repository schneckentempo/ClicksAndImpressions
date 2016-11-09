import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import NumberWithLabel from '../NumberWithLabel'

const wrapper = shallow(<NumberWithLabel />)

describe('(Component) NumberWithLabel', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
