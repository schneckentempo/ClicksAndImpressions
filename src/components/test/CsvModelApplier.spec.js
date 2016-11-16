import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import CsvModelApplier from '../CsvModelApplier'

const wrapper = shallow(<CsvModelApplier options={[]} />)

describe('(Component) CsvModelApplier', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
