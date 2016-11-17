import React, { Component } from 'react'
import CsvMappingApplier from './components/CsvMappingApplier'
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
        <CsvMappingApplier defaultDataSource="http://mockbin.org/bin/ee7a13ae-4732-445d-ac76-27bc8e74edc5" onApply={this.handleApply} />
        <SumNumbersForDimensionValueWidget
          adwordData={this.state.adwordData}
          options={this.state.options}
          mapping={this.state.mapping}
        />
      </div>
    )
  }
}
