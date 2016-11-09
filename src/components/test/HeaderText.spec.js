import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import HeaderText from '../HeaderText'

const wrapper = shallow(<HeaderText />)

describe('(Component) HeaderText', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
