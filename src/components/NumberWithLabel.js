import React from 'react';

export default function NumberWithLabel({ label, number }) {
  const outerSpanStyle = {
    marginRight: '1em',
    display: 'inline',
  };
  const innerSpanStyle = {
    color: '#DD0000',
    backgroundColor: '#EEEEEE',
    border: '1px gray',
    borderRadius: '3px',
    padding: '0.3em',
  };

  return (
    <span style={outerSpanStyle}>
      { label } <span style={innerSpanStyle}>{ number }</span>
    </span>
);
}

NumberWithLabel.propTypes = {
  label: React.PropTypes.string,
  number: React.PropTypes.number,
};
