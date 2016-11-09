import 'jsdom-global/register'
import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import App from '../App'

describe('<App />', () => {
  it('calls componentDidMount', () => {
    const spy = sinon.spy(App, 'componentDidMount')
    const wrapper = mount(<App />)
    expect(App.componentDidMount.calledOnce).to.equal(true)
  })
})
