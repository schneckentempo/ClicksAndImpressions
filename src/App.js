import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CsvMappingApplier from './components/CsvMappingApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import { applyData } from './actions'
import './styles.css'

const App = ({ normalizedCsv, dimensionValues, mapping, onApply }) => (
  <div>
    <CsvMappingApplier defaultDataSource="http://mockbin.org/bin/ee7a13ae-4732-445d-ac76-27bc8e74edc5" onApply={onApply} />
    <SumNumbersForDimensionValueWidget
      normalizedCsv={normalizedCsv}
      dimensionValues={dimensionValues}
      mapping={mapping}
    />
  </div>
)

const mapStateToProps = ({ normalizedCsv, dimensionValues, mapping }) => ({
  normalizedCsv,
  dimensionValues,
  mapping,
})

const mapDispatchToProps = dispatch => ({
  onApply: (csvData, mapping) => dispatch(applyData(csvData, mapping)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  onApply: PropTypes.func,
}
