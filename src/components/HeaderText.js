import React from 'react'

export default function HeaderText({ text }) {
  return <h3>{ text }</h3>
}

HeaderText.propTypes = {
  text: React.PropTypes.string,
}
