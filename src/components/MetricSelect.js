import React from 'react'
import Select from 'react-select'

export default function MetricSelect({ value, options, onChange, width }) {
  const selectDivStyle = {
    display: 'inline-block',
    width: `${width}px`,
  }

  return (
    <div style={selectDivStyle}>
      <Select
        name="selectField"
        value={value}
        options={options}
        simpleValue
        onChange={onChange}
        placeholder=""
      />
    </div>
  )
}

MetricSelect.propTypes = {
  value: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
  width: React.PropTypes.number,
}
