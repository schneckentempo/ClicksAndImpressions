import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { pickBy, startsWith, reduce, tail, zipObject, concat, ma, isEqual } from 'lodash'
import NumberWithLabel from './NumberWithLabel'

const axios = require('axios')

export default class ClicksAndImpressions extends Component { 
	
	staticpropTypes: {
		label: PropTypes.string
	}

	state = {
		value: '',
		options: [],
	}

	onChange = (value) => {
		console.log('New Value', value);


		this.setState({ value });
	}

	getOptions = (input) => {
		if(isEqual({}, this.state.adwordData))
			return axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then((response) => {
				return this.csvToJson(response.data);
				})
			.then((json) => {
				//console.log(json)
				return { options: json.items };
			});
	}

	render () {
		const selectDivStyle = {
			display: 'inline-block',
			width: '300px'
		}
		return (
			
			</div>
		)
	}
}