import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import SumNumbersForDimensionValue from './SumNumbersForDimensionValue'
import { changeSelectedDimensionValue } from '../actions'
import { computeSumMetrics } from '../selectors'

export class SumNumbersForDimensionValueWidget extends Component {
  componentWillReceiveProps = (nextProps) => {
    const { mapping, onSelectDimensionValue } = this.props

    if (!isEqual(mapping, nextProps.mapping)) {
      onSelectDimensionValue('')
    }
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { onSelectDimensionValue } = this.props

    onSelectDimensionValue(selectedDimensionValue)
  }

  render() {
    const { mapping, selectedDimensionValue, dimensionValues, sumMetrics } = this.props
    const headerArray = (
      mapping.dimensions
        ? mapping.dimensions.map(dimensionObject => dimensionObject.header)
        : []
    )
    const header = headerArray.length > 0 ? headerArray.join('/') : 'dimension'

    return (
      <SumNumbersForDimensionValue
        header={`Choose ${header}:`}
        value={selectedDimensionValue}
        dimensionValues={dimensionValues}
        onChange={this.onChangeDimensionValue}
        metrics={sumMetrics}
      />
    )
  }
}

const mapStateToProps = ({ mapping, selectedDimensionValue }, { normalizedCsv }) => {
  const sumMetrics = computeSumMetrics({
    normalizedCsv,
    mapping,
    selectedDimensionValue,
  })

  return {
    selectedDimensionValue,
    sumMetrics,
  }
}

const mapDispatchToProps = dispatch => ({
  onSelectDimensionValue: dimensionValue => dispatch(changeSelectedDimensionValue(dimensionValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SumNumbersForDimensionValueWidget)

SumNumbersForDimensionValueWidget.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  selectedDimensionValue: PropTypes.string,
  onSelectDimensionValue: PropTypes.func,
  sumMetrics: PropTypes.arrayOf(PropTypes.object),
}
