import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CsvMappingApplier from './components/CsvMappingApplier'
import NumberWithLabel from './components/NumberWithLabel'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import { computeNormalizedData, computeSumMetrics } from './selectors'
import { fetchCsvData, changeMapping, changeSelectedDimensionValue } from './actions'
import './styles.css'

export const App = ({
  normalizedCsv,
  dimensionValues,
  mapping,
  defaultDataSource,
  badRequest,
  onApply,
  onSelect,
  sumMetrics,
  selectedDimensionValue,
}) => (
  <div>
    <CsvMappingApplier
      defaultDataSource={defaultDataSource}
      mapping={mapping}
      badRequest={badRequest}
      onClickApply={onApply}
    />
    <SumNumbersForDimensionValueWidget
      normalizedCsv={normalizedCsv}
      dimensionValues={dimensionValues}
      mapping={mapping}
      selectedDimensionValue={selectedDimensionValue}
      onSelectDimensionValue={onSelect}
    />
    <p>
    {
      sumMetrics.map((metricsObject, i) =>
        <NumberWithLabel key={`nwl_${i}`} label={metricsObject.name} number={metricsObject.sum} />)
    }
    </p>
  </div>
)

const mapStateToProps = ({
    csvData,
    mapping,
    defaultDataSource,
    selectedDimensionValue,
    badRequest,
  }) => {
  const { normalizedCsv, dimensionValues } = computeNormalizedData({ csvData, mapping })
  const sumMetrics = computeSumMetrics({
    normalizedCsv,
    mapping,
    selectedDimensionValue,
  })

  return {
    normalizedCsv,
    dimensionValues,
    mapping,
    defaultDataSource,
    selectedDimensionValue,
    badRequest,
    sumMetrics,
  }
}

const mapDispatchToProps = dispatch => ({
  onApply: ({ appliedMapping, dataSource }) => {
    dispatch(fetchCsvData(dataSource))
    dispatch(changeMapping(appliedMapping))
  },
  onSelect: dimensionValue => dispatch(changeSelectedDimensionValue(dimensionValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  defaultDataSource: PropTypes.string,
  badRequest: PropTypes.bool,
  onApply: PropTypes.func,
  onSelect: PropTypes.func,
  sumMetrics: PropTypes.arrayOf(PropTypes.object),
  selectedDimensionValue: PropTypes.string,
}
