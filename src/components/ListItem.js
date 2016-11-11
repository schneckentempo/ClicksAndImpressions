import React, { Component, PropTypes } from 'react'

export default class ListItem extends Component {
  onClick = () => {
    this.props.onItemClick(this.props.item.value)
  }

  render() {
    const aBtnStyle = {
      boxSizing: 'border-box',
      display: 'block',
      backgroundColor: 'lightgrey',
      padding: 5,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    }

    const liStyle = {
      width: '100%',
      padding: 0,
      margin: 0,
    }

    return (
      <li style={liStyle}>
        <a tabIndex={this.props.index} onClick={this.onClick} style={aBtnStyle}>
          {this.props.item.label}
        </a>
      </li>
    )
  }
}

ListItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onItemClick: PropTypes.func,
}
