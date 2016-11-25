import React from 'react'
import { view } from 'redux-elm'
import CsvMappingApplier from '../components/CsvMappingApplier'
import NumberWithLabel from '../components/NumberWithLabel'
import SumNumbersForDimensionValueWidget from '../components/SumNumbersForDimensionValueWidget'
import { computeNormalizedData, computeSumMetrics } from '../selectors'
import { fetchCsvData, changeSelectedDimensionValue } from '../actions'
import styles from './styles.css'

export default view(({ model: {
  csvData,
  mapping,
  defaultDataSource,
  selectedDimensionValue,
  badRequest,
}, dispatch }) => {
  const { normalizedCsv, dimensionValues } = computeNormalizedData({ csvData, mapping })
  const sumMetrics = computeSumMetrics({
    normalizedCsv,
    mapping,
    selectedDimensionValue,
  })

  return (
    <div className={styles.container}>
      <CsvMappingApplier
        defaultDataSource={defaultDataSource}
        mapping={mapping}
        badRequest={badRequest}
        onClickApply={
          ({ appliedMapping, dataSource }) => dispatch(fetchCsvData(dataSource, appliedMapping))
        }
      />
      <SumNumbersForDimensionValueWidget
        normalizedCsv={normalizedCsv}
        dimensionValues={dimensionValues}
        mapping={mapping}
        selectedDimensionValue={selectedDimensionValue}
        onSelectDimensionValue={
          dimensionValue => dispatch(changeSelectedDimensionValue(dimensionValue))
        }
      />
      <p>
      {
        sumMetrics.map((metricsObject, i) =>
          <NumberWithLabel key={`nwl_${i}`} label={metricsObject.name} number={metricsObject.sum} />)
      }
      </p>
    </div>
  )
})
