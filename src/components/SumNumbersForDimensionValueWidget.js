import React, { Component, PropTypes } from 'react'
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

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { adwordData, model } = this.props

    if (model.metrics) {
      const sumMetrics = model.metrics.map((metricObject) => {
        const sum = getSum(adwordData, selectedDimensionValue, metricObject.header, model)

        return { name: metricObject.header, sum }
      })

      this.setState({ selectedDimensionValue, sumMetrics })
    }
  }

  render() {
    const { selectedDimensionValue, sumMetrics } = this.state
    const { options } = this.props

    return (
      <SumNumbersForDimensionValue
        header="Choose channel or campaign:"
        value={selectedDimensionValue}
        options={options}
        onChange={this.onChangeDimensionValue}
        metrics={sumMetrics}
      />
    )
  }
}

SumNumbersForDimensionValueWidget.propTypes = {
  model: PropTypes.objectOf(PropTypes.array),
  adwordData: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
}
