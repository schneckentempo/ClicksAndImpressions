import 'jsdom-global/register'
import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import HeaderText from '../components/HeaderText'

describe('<HeaderText />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(HeaderText.prototype, 'componentDidMount')
    const wrapper = mount(<HeaderText />)
    expect(HeaderText.prototype.componentDidMount.calledOnce).to.equal(true)
  })
})
