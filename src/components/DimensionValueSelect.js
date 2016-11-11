import React from 'react'
import Select from 'react-select'

export default function DimensionValueSelect({ value, options, onChange }) {
  const selectDivStyle = {
    display: 'inline-block',
    width: '300px',
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

DimensionValueSelect.propTypes = {
  value: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
}
