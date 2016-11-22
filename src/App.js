import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CsvMappingApplier from './components/CsvMappingApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import { computeNormalizedData } from './selectors'

import './styles.css'

const App = ({
  normalizedCsv,
  dimensionValues,
  mapping,
  defaultDataSource,
}) => (
  <div>
    <CsvMappingApplier defaultDataSource={defaultDataSource} mapping={mapping} />
    <SumNumbersForDimensionValueWidget
      normalizedCsv={normalizedCsv}
      dimensionValues={dimensionValues}
      mapping={mapping}
    />
  </div>
)

const mapStateToProps = (
  {
    csvMapping: {
      csvData,
      mapping,
      defaultDataSource,
      selectedDimensionValue,
    },
  }
) => {
  const { normalizedCsv, dimensionValues } = computeNormalizedData({ csvData, mapping })
  return {
    normalizedCsv,
    dimensionValues,
    mapping,
    defaultDataSource,
    selectedDimensionValue,
  }
}

export default connect(mapStateToProps)(App)

App.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  defaultDataSource: PropTypes.string,
}
