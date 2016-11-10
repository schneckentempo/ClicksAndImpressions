import React, { Component } from 'react'
import SumNumbersForDimensionValue from './components/SumNumbersForDimensionValue'
import getSum from './utils/getSum'
import csvToJson from './utils/csvToJson'

const axios = require('axios')

export default class App extends Component {
//-------------------------------
// TODO:
//-------------------------------
  constructor() {
    super()
    this.state = {
      selectedDimensionValue: '',
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
  }


  componentDidMount = () => {
    axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then(response =>
      this.setState(csvToJson(response.data, this.state.model))
    )
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const sumClicks = getSum(this.state.adwordData, selectedDimensionValue, 'clicks', this.state.model)
    const sumImpressions = getSum(this.state.adwordData, selectedDimensionValue, 'impressions', this.state.model)

    this.setState({ selectedDimensionValue, sumClicks, sumImpressions })
  }

  render() {
    return (
      <SumNumbersForDimensionValue
        header="Choose channel or campaign:"
        value={this.state.selectedDimensionValue}
        options={this.state.options}
        onChange={this.onChangeDimensionValue}
        clicks={this.state.sumClicks}
        impressions={this.state.sumImpressions}
      />
    )
  }
}
