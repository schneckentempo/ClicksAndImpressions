import React, { Component } from 'react'
import CsvModelApplier from './components/CsvModelApplier'
import SumNumbersForDimensionValueWidget from './components/SumNumbersForDimensionValueWidget'
import './styles.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: '',
    }
  }

  render() {
    return (
      <div>
        <CsvModelApplier defaultSource="http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6" />
        <SumNumbersForDimensionValueWidget />
      </div>
    )
  }
}
