import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import SumNumbersForDimensionValue from './SumNumbersForDimensionValue'

export default class SumNumbersForDimensionValueWidget extends Component {
  componentWillReceiveProps = (nextProps) => {
    const { mapping, dimensionValues, onSelectDimensionValue } = this.props

    if (
      !isEqual(mapping, nextProps.mapping) ||
      !isEqual(dimensionValues, nextProps.dimensionValues)
    ) {
      onSelectDimensionValue('')
    }
  }

  onChangeDimensionValue = (selectedDimensionValue) => {
    const { onSelectDimensionValue } = this.props

    onSelectDimensionValue(selectedDimensionValue)
  }

  render() {
    const { mapping, selectedDimensionValue, dimensionValues } = this.props
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
      />
    )
  }
}

SumNumbersForDimensionValueWidget.propTypes = {
  mapping: PropTypes.objectOf(PropTypes.array),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  selectedDimensionValue: PropTypes.string,
  onSelectDimensionValue: PropTypes.func,
}
