import React, { Component } from 'react'
import CsvModelApplier from './components/CsvModelApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import csvToJson from './utils/csvToJson'
import './styles.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      csvData: '',
      mapping: {},
      adwordData: [],
      options: [],
    }
  }

  handleApply = (csvData, mapping) => {
    const { options, adwordData } = csvToJson(csvData, mapping)
    this.setState({ csvData, mapping, adwordData, options })
  }

  render() {
    return (
      <div>
        <CsvModelApplier defaultDataSource="http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6" onApply={this.handleApply} />
        <SumNumbersForDimensionValueWidget
          adwordData={this.state.adwordData}
          options={this.state.options}
          mapping={this.state.mapping}
        />
      </div>
    )
  }
}
