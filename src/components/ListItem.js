import React, { PropTypes } from 'react'
import { withHandlers, withProps, compose } from 'recompose'
import styles from './ListItem.css'

const ListItem = ({ index, label, onClick }) => (
  <li className={styles.listElement}>
    <a tabIndex={index} onClick={onClick} className={styles.listButton}>
      {label}
    </a>
  </li>
)

ListItem.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

export default compose(
  withProps(({ item }) => ({
    label: item.label,
  })),
  withHandlers({
    onClick: props => () => {
      props.onItemClick(props.item.value)
    },
  })
)(ListItem)
