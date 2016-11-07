import React, { Component } from 'react';
import Select from 'react-select';
import { pickBy, reduce, tail, zipObject, concat, map, sortBy, sumBy } from 'lodash'
import NumberWithLabel from './components/NumberWithLabel'
import HeaderText from './components/HeaderText'

const axios = require('axios')

export default class App extends Component {
	//-------------------------------
	// TODO:
	//-------------------------------
	state = {
		value: '',
		adwordData: {},
		options: [],
		sumClicks: 0,
		sumImpressions: 0,
		model: {
			campaign: 0,
			channel: 1,
			clicks: 2,
			impressions: 3
		}
	}

	getSum = (value, col) => {
		let sum = sumBy(this.state.adwordData, (o) => {
			if(o[this.getColumn(o, 'campaign')] === value
			|| o[this.getColumn(o, 'channel')] === value)
				return o[this.getColumn(o, col)]
		});

		return sum;
	}

	onChange = (value) => {
		console.log('New Value', value)

		const sumClicks = this.getSum(value, 'clicks')
		const sumImpressions = this.getSum(value, 'impressions')

		this.setState({ value, sumClicks, sumImpressions })
	}

	componentDidMount = () => {
		console.log("did mount")

		axios.get('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6').then((response) =>
			this.csvToJson(response.data)
		);
	}

	parseRow = (row) => {
		row[2] = parseInt(row[2])
		row[3] = parseInt(row[3])

		return row;
	}

	getColumn = (obj, prop) => {
		return Object.keys(obj)[this.state.model[prop]]
	}

	csvToJson = (csv) => {
		const content = csv.trim().split('\n')

		const header = content[0].split(',')
		const adwordData = sortBy(tail(content).map(row => {
			return zipObject(header, this.parseRow(row.split(',')))
		}), ['campaign', 'channel'])

		//this.setState({ adwordData: jsonData });

		//console.log(JSON.stringify(adwordData))

		var uniques = concat(
			...new Set(adwordData.map(item => item[this.getColumn(item, 'campaign')])),
			...new Set(adwordData.map(item => item[this.getColumn(item, 'channel')]))
		);

		//console.log(adwordData.map(item => item[this.getColumn(item, 'campaign')]))

		//console.log(JSON.stringify(uniques))

		const options = uniques.map((value, key) => {
			return { value: value, label: value }
		})

		//console.log(JSON.stringify(options))

		this.setState({ options, adwordData })
	}

	render() {
		const selectDivStyle = {
			display: 'inline-block',
			width: '300px'
		}

		return (
			<div>
				<HeaderText text='Choose channel or campaign:' />
				<div style={selectDivStyle}>
					<Select
					    name='selectField'
					    value={this.state.value}
					    options={this.state.options}
					    simpleValue
					    onChange={this.onChange}
					    placeholder=''
					/>
				</div>
				<p>
					<NumberWithLabel label='Clicks:' number={this.state.sumClicks} />
					<NumberWithLabel label='Impressions:' number={this.state.sumImpressions} />
				</p>
			</div>
		);
	}
}
