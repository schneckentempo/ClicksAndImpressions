import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { App } from '../../App'

const wrapper = shallow(<App sumMetrics={[]} />)

describe('(Component) App', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
