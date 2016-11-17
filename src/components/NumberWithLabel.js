import React from 'react'
import styles from './NumberWithLabel.css'

export default function NumberWithLabel({ label, number }) {
  return (
    <span className={styles.outerSpan}>
      { label }: <span className={styles.innerSpan}>{ number }</span>
    </span>
)
}

NumberWithLabel.propTypes = {
  label: React.PropTypes.string,
  number: React.PropTypes.number,
}
