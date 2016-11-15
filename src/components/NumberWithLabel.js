import React from 'react'
import styles from './styles.css'

export default function NumberWithLabel({ label, number }) {
  return (
    <span className={styles.nwl_outerSpan}>
      { label } <span className={styles.nwl_innerSpan}>{ number }</span>
    </span>
)
}

NumberWithLabel.propTypes = {
  label: React.PropTypes.string,
  number: React.PropTypes.number,
}
