import React from 'react'
import HeaderText from './HeaderText'
import NumberWithLabel from './NumberWithLabel'
import DimensionValueSelect from './DimensionValueSelect'

export default function SumNumbersForDimensionValue({ header, value, options, onChange, clicks, impressions }) {
  return (
    <div>
      <HeaderText text={header} />
      <DimensionValueSelect value={value} options={options} onChange={onChange} />
      <p>
        <NumberWithLabel label="Clicks:" number={clicks} />
        <NumberWithLabel label="Impressions:" number={impressions} />
      </p>
    </div>
  )
}

SumNumbersForDimensionValue.propTypes = {
  header: React.PropTypes.string,
  value: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
  clicks: React.PropTypes.number,
  impressions: React.PropTypes.number,
}
