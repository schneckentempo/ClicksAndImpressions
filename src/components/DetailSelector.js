import React from 'react'
import HeaderText from './HeaderText'
import NumberWithLabel from './NumberWithLabel'
import MetricSelect from './MetricSelect'

export default function DetailSelector({ header, value, options, onChange, clicks, impressions }) {
  return (
    <div>
      <HeaderText text={header} />
      <MetricSelect value={value} options={options} onChange={onChange} width="300" />
      <p>
        <NumberWithLabel label="Clicks:" number={clicks} />
        <NumberWithLabel label="Impressions:" number={impressions} />
      </p>
    </div>
  )
}

DetailSelector.propTypes = {
  header: React.PropTypes.string,
  value: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
  clicks: React.PropTypes.number,
  impressions: React.PropTypes.number,
}
