import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { CsvMappingApplier } from '../CsvMappingApplier'

const wrapper = shallow(<CsvMappingApplier defaultDataSource="" />)

describe('(Component) CsvMappingApplier', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
