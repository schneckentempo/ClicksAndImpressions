import React, { Component } from 'react';
import Select from 'react-select';
import { pickBy, startsWith, reduce, tail, zipObject, concat, map, sortBy } from 'lodash'

const axios = require('axios')

export default class App extends Component {
	//-------------------------------
	// TODO: Implement Data-Model
	//-------------------------------
	state = {
		value: '',
		adwordData: {},
		options: []
	}

	onChange = (value) => {
		console.log('New Value', value);

		this.setState({ value });
	}

	componentDidMount = () => {
		console.log("did mount")

		axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then((response) =>
			this.csvToJson(response.data)
		);
	}

	csvToJson = (csv) => {
		const content = csv.trim().split('\n');

		const header = content[0].split(',');
		const adwordData = sortBy(tail(content).map(row => {
			return zipObject(header, row.split(','));
		}), ['campaign', 'channel']);

		//this.setState({ adwordData: jsonData });

		//console.log(JSON.stringify(adwordData))

		var uniques = concat(...new Set(adwordData.map(item => item.campaign)), ...new Set(adwordData.map(item => item.channel)));

		//console.log(JSON.stringify(uniques));

		const options = uniques.map((value, key) => {
			return { value: value, label: value };
		});

		//console.log(JSON.stringify(options))

		this.setState({ options, adwordData });
	}
	
	render() {
		return (
			<Select
			    name='selectField'
			    value={this.state.value}
			    options={this.state.options}
			    simpleValue
			    onChange={this.onChange}
			/>
		);
	}
}

