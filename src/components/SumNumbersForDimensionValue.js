import React from 'react'
import HeaderText from './HeaderText'
import NumberWithLabel from './NumberWithLabel'
import DimensionValueSelect from './DimensionValueSelect'
import DimensionValueChooser from './DimensionValueChooser'

export default function SumNumbersForDimensionValue({
  header,
  value,
  dimensionValues,
  onChange,
  metrics,
}) {
  return (
    <div>
      <HeaderText text={header} />
      <DimensionValueSelect value={value} options={dimensionValues} onChange={onChange} />
      <DimensionValueChooser value={value} options={dimensionValues} onChange={onChange} />
      <p>
      {
        metrics.map((metricsObject, i) =>
          <NumberWithLabel key={`nwl_${i}`} label={metricsObject.name} number={metricsObject.sum} />)
      }
      </p>
    </div>
  )
}

SumNumbersForDimensionValue.propTypes = {
  header: React.PropTypes.string,
  value: React.PropTypes.string,
  dimensionValues: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
  metrics: React.PropTypes.arrayOf(React.PropTypes.object),
}
