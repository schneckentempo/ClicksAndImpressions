import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import SumNumbersForDimensionValue from './SumNumbersForDimensionValue'
import getSum from '../utils/getSum'

export default class SumNumbersForDimensionValueWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDimensionValue: '',
      sumMetrics: [],
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { mapping } = this.props

    if (!isEqual(mapping, nextProps.mapping)) {
      const sumMetrics = nextProps.mapping.metrics.map(metricObject =>
        ({ name: metricObject.header, sum: 0 })
      )

      this.setState({ selectedDimensionValue: '', sumMetrics })
    }
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { normalizedCsv, mapping } = this.props

    if (mapping.metrics) {
      const sumMetrics = mapping.metrics.map((metricObject) => {
        const sum = getSum(normalizedCsv, selectedDimensionValue, metricObject.header, mapping)
        return { name: metricObject.header, sum }
      })

      this.setState({ selectedDimensionValue, sumMetrics })
    }
  }

  render() {
    const { selectedDimensionValue, sumMetrics } = this.state
    const { dimensionValues } = this.props

    return (
      <SumNumbersForDimensionValue
        header="Choose channel or campaign:"
        value={selectedDimensionValue}
        dimensionValues={dimensionValues}
        onChange={this.onChangeDimensionValue}
        metrics={sumMetrics}
      />
    )
  }
}

SumNumbersForDimensionValueWidget.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
}
