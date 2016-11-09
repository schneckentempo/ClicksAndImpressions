import React, { Component } from 'react'
import Select from 'react-select'
import NumberWithLabel from './components/NumberWithLabel'
import HeaderText from './components/HeaderText'
import getSum from './utils/getSum'
import csvToJson from './utils/csvToJson'

const axios = require('axios')

export default class App extends Component {
//-------------------------------
// TODO:
//-------------------------------
  state = {
    value: '',
    adwordData: {},
    options: [],
    sumClicks: 0,
    sumImpressions: 0,
    model: {
      campaign: 0,
      channel: 1,
      clicks: 2,
      impressions: 3,
    },
  }

  componentDidMount = () => {
    axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then(response =>
      this.setState(csvToJson(response.data, this.state.model))
    )
  }

  onChange = (value) => {
    const sumClicks = getSum(this.state.adwordData, value, 'clicks', this.state.model)
    const sumImpressions = getSum(this.state.adwordData, value, 'impressions', this.state.model)

    this.setState({ value, sumClicks, sumImpressions })
  }

  render() {
    const selectDivStyle = {
      display: 'inline-block',
      width: '300px',
    }

    return (
      <div>
        <HeaderText text="Choose channel or campaign:" />
        <div style={selectDivStyle}>
          <Select
            name="selectField"
            value={this.state.value}
            options={this.state.options}
            simpleValue
            onChange={this.onChange}
            placeholder=""
          />
        </div>
        <p>
          <NumberWithLabel label="Clicks:" number={this.state.sumClicks} />
          <NumberWithLabel label="Impressions:" number={this.state.sumImpressions} />
        </p>
      </div>
    )
  }
}
