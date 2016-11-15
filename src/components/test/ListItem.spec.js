import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import ListItem from '../ListItem'

const wrapper = shallow(<ListItem item={{}} />)

describe('(Component) ListItem', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
