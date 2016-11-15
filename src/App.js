import React, { Component } from 'react'
import SumNumbersForDimensionValue from './components/SumNumbersForDimensionValue'
import getSum from './utils/getSum'
import csvToJson from './utils/csvToJson'
import dataProvider from './utils/dataProvider'

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
      model: dataProvider('mockbin.org'),
      sumMetrics: dataProvider('mockbin.org').metrics.map(metricObject => ({ name: metricObject.header, sum: 0 })),
    }
  }


  componentDidMount = () => {
    axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then(response =>
      this.setState(csvToJson(response.data, this.state.model))
    )
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { adwordData, model } = this.state

    const sumMetrics = model.metrics.map((metricObject) => {
      const sum = getSum(adwordData, selectedDimensionValue, metricObject.header, model)

      return { name: metricObject.header, sum }
    })

    this.setState({ selectedDimensionValue, sumMetrics })
  }

  render() {
    return (
      <SumNumbersForDimensionValue
        header="Choose channel or campaign:"
        value={this.state.selectedDimensionValue}
        options={this.state.options}
        onChange={this.onChangeDimensionValue}
        metrics={this.state.sumMetrics}
      />
    )
  }
}
