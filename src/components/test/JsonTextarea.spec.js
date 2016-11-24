import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import JsonTextarea from '../JsonTextarea'

const wrapper = shallow(<JsonTextarea />)

describe('(Component) JsonTextarea', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
