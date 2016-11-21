import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CsvMappingApplier from './components/CsvMappingApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import { applyData } from './actions'
import './styles.css'

const App = ({ normalizedCsv, dimensionValues, mapping, onApply, defaultDataSource }) => (
  <div>
    <CsvMappingApplier defaultDataSource={defaultDataSource} onApply={onApply} mapping={mapping} />
    <SumNumbersForDimensionValueWidget
      normalizedCsv={normalizedCsv}
      dimensionValues={dimensionValues}
      mapping={mapping}
    />
  </div>
)

const mapStateToProps = (
  {
    dataSource: {
      normalizedCsv,
      dimensionValues,
    },
    csvMapping: {
      mapping,
      defaultDataSource,
    },
  }
) => ({
  normalizedCsv,
  dimensionValues,
  mapping,
  defaultDataSource,
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
  defaultDataSource: PropTypes.string,
}
