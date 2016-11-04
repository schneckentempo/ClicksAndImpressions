import React from 'react'

export default function NumberWithLabel({ label, number }) {
	var outerSpanStyle = {
		marginRight: '1em',
		display: 'inline'
	}
	var innerSpanStyle = {
		color: '#DD0000',
		backgroundColor: '#EEEEEE',
		border : '1px gray',
		borderRadius: '3px',
		padding: '0.3em'
	}

	return (
		<span style={outerSpanStyle}>
			{ label } <span style={innerSpanStyle}>{ number }</span>
		</span>
	)
}
