import React, { Component } from 'react'
import { tail, zipObject, concat, sortBy, sumBy } from 'lodash'
import SumNumbersForDimensionValue from './components/SumNumbersForDimensionValue'

const axios = require('axios')

export default class App extends Component {
//-------------------------------
// TODO:
//-------------------------------
  state = {
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

  componentDidMount = () => {
    axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then(response =>
      this.csvToJson(response.data)
    )
  }

  onChange = (selectedDimensionValue) => {
    const sumClicks = this.getSum(selectedDimensionValue, 'clicks')
    const sumImpressions = this.getSum(selectedDimensionValue, 'impressions')

    this.setState({ selectedDimensionValue, sumClicks, sumImpressions })
  }

  getSum = (value, col) => {
    const sum = sumBy(this.state.adwordData, (o) => {
      if (o[this.getColumn(o, 'campaign')] === value || o[this.getColumn(o, 'channel')] === value) {
        return o[this.getColumn(o, col)]
      }

      return 0
    })

    return sum
  }

  getColumn = (obj, prop) => Object.keys(obj)[this.state.model[prop]];


  parseRow = (row) => {
    const parsedRow = [...row]

    parsedRow[2] = parseInt(parsedRow[2], 10)
    parsedRow[3] = parseInt(parsedRow[3], 10)

    return parsedRow
  }

  csvToJson = (csv) => {
    const content = csv.trim().split('\n')

    const header = content[0].split(',')
    const adwordData = sortBy(tail(content).map(row =>
      zipObject(header, this.parseRow(row.split(',')))
    ), ['campaign', 'channel'])

    const uniques = concat(
      ...new Set(adwordData.map(item => item[this.getColumn(item, 'campaign')])),
      ...new Set(adwordData.map(item => item[this.getColumn(item, 'channel')]))
    )

    const options = uniques.map(value => ({ value, label: value }))

    this.setState({ options, adwordData })
  }

  render() {
    return (
      <SumNumbersForDimensionValue
        header="Choose channel or campaign:"
        value={this.state.selectedDimensionValue}
        options={this.state.options}
        onChange={this.onChange}
        clicks={this.state.sumClicks}
        impressions={this.state.sumImpressions}
      />
    )
  }
}
