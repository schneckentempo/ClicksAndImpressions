import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import SumNumbersForDimensionValue from './SumNumbersForDimensionValue'
import getSum from '../utils/getSum'
import { changeSelectedDimensionValue } from '../actions'

class SumNumbersForDimensionValueWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sumMetrics: [],
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { mapping, onSelectDimensionValue } = this.props

    if (!isEqual(mapping, nextProps.mapping)) {
      const sumMetrics = nextProps.mapping.metrics.map(metricObject =>
        ({ name: metricObject.header, sum: 0 })
      )

      this.setState({ sumMetrics })
      onSelectDimensionValue('')
    }
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { normalizedCsv, mapping, onSelectDimensionValue } = this.props

    if (mapping.metrics) {
      const sumMetrics = mapping.metrics.map((metricObject) => {
        const sum = getSum(normalizedCsv, selectedDimensionValue, metricObject.header, mapping)
        return { name: metricObject.header, sum }
      })

      this.setState({ sumMetrics })
      onSelectDimensionValue(selectedDimensionValue)
    }
  }

  render() {
    const { sumMetrics } = this.state
    const { selectedDimensionValue, dimensionValues } = this.props

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

const mapStateToProps = ({ csvMapping: { selectedDimensionValue } }) => ({
  selectedDimensionValue,
})

const mapDispatchToProps = dispatch => ({
  onSelectDimensionValue: dimensionValue => dispatch(changeSelectedDimensionValue(dimensionValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SumNumbersForDimensionValueWidget)

SumNumbersForDimensionValueWidget.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  normalizedCsv: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  selectedDimensionValue: PropTypes.string,
  onSelectDimensionValue: PropTypes.func,
}
