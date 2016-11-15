import React from 'react'
import Select from 'react-select'
import styles from './styles.css'

export default function DimensionValueSelect({ value, options, onChange }) {
  return (
    <div className={styles.dvs_selectDiv}>
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
