import React, { Component, PropTypes } from 'react'
import HeaderText from './HeaderText'
import styles from './CsvModelApplier.css'
import dataProvider from '../utils/dataProvider'

const axios = require('axios')

export default class CsvModelApplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.defaultSource,
      dataModel: JSON.stringify(dataProvider(props.defaultSource), undefined, 2),
      csvData: '',
      badRequest: false,
    }
  }

  onBlurInput = () => {
    const dataSource = this.inputField.value

    axios.get(dataSource).then((response) => {
      const csvData = response.data
      const dataModel = response.data !== '' ? JSON.stringify(dataProvider(dataSource), undefined, 2) : '{}'

      if (csvData !== '') {
        this.setState({ dataSource, dataModel, csvData, badRequest: false })
      } else {
        this.setState({ dataSource: '', dataModel: '{}', csvData: '', badRequest: true })
      }
    })
    .catch(() => {
      this.setState({ dataSource: '', dataModel: '{}', csvData: '', badRequest: true })
    })
  }

  onChangeTextarea = () => {
    const dataModel = this.textareaField.value

    this.setState({ dataModel })
  }

  onClickApply = () => {
    console.log(this.state)
  }

  render() {
    const badRequestStyle = {
      outline: this.state.badRequest ? '2px solid red' : '',
    }

    return (
      <div>
        <HeaderText text="Choose data-source:" />
        <input
          ref={(ref) => { this.inputField = ref }}
          defaultValue={this.props.defaultSource}
          onBlur={this.onBlurInput}
          type="text"
          className={styles.sourceInput}
          style={badRequestStyle}
        />
        <textarea
          ref={(ref) => { this.textareaField = ref }}
          value={this.state.dataModel}
          onChange={this.onChangeTextarea}
          className={styles.jsonViewer}
        />
        <button
          type="button"
          className={styles.applyBtn}
          onClick={this.onClickApply}
          disabled={this.state.csvData === ''}
        >
          Apply
        </button>
      </div>
    )
  }
}

CsvModelApplier.propTypes = {
  defaultSource: PropTypes.string,
}
