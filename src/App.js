import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CsvMappingApplier from './components/CsvMappingApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import csvToJson from './utils/csvToJson'
import './styles.css'

// action name
const APPLY_DATA = 'APPLY_DATA'

// action creator
const applyData = (csvData, mapping, normalizedCsv, dimensionValues) => (
  {
    type: APPLY_DATA,
    csvData,
    mapping,
    normalizedCsv,
    dimensionValues,
  }
)

class App extends Component {
  handleApply = (csvData, mapping) => {
    const { dispatch } = this.props
    const { dimensionValues, normalizedCsv } = csvToJson(csvData, mapping)

    dispatch(applyData(csvData, mapping, normalizedCsv, dimensionValues))
  }

  render() {
    const { normalizedCsv, dimensionValues, mapping } = this.props
    return (
      <div>
        <CsvMappingApplier defaultDataSource="http://mockbin.org/bin/ee7a13ae-4732-445d-ac76-27bc8e74edc5" onApply={this.handleApply} />
        <SumNumbersForDimensionValueWidget
          normalizedCsv={normalizedCsv}
          dimensionValues={dimensionValues}
          mapping={mapping}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ normalizedCsv, dimensionValues, mapping }) => ({
  normalizedCsv,
  dimensionValues,
  mapping,
})

export default connect(mapStateToProps)(App)

App.propTypes = {
  dispatch: PropTypes.func,
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
}
