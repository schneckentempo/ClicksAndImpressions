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
      normalizedCsv: [],
      options: [],
    }
  }

  handleApply = (csvData, mapping) => {
    const { options, normalizedCsv } = csvToJson(csvData, mapping)
    this.setState({ csvData, mapping, normalizedCsv, options })
  }

  render() {
    const { normalizedCsv, options, mapping } = this.state
    return (
      <div>
        <CsvMappingApplier defaultDataSource="http://mockbin.org/bin/ee7a13ae-4732-445d-ac76-27bc8e74edc5" onApply={this.handleApply} />
        <SumNumbersForDimensionValueWidget
          normalizedCsv={normalizedCsv}
          options={options}
          mapping={mapping}
        />
      </div>
    )
  }
}
