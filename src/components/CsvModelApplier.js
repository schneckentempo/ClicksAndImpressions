import React, { Component, PropTypes } from 'react'
import HeaderText from './HeaderText'
import styles from './CsvModelApplier.css'
import dataProvider from '../utils/dataProvider'

const axios = require('axios')

export default class CsvModelApplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataModel: JSON.stringify(dataProvider(props.defaultSource), undefined, 2),
      csvData: '',
      badRequest: false,
      badModel: false,
    }
  }

  componentDidMount = () => {
    const { defaultSource } = this.props

    if (defaultSource !== '') {
      this.fetchData()
    }
  }

  onBlurInput = () => {
    this.fetchData()
  }

  onChangeTextarea = () => {
    const dataModel = this.textareaField.value

    this.setState({ dataModel })
  }

  onClickApply = () => {
    const { csvData, dataModel } = this.state

    try {
      this.props.onApply(csvData, JSON.parse(dataModel))
      this.setState({ badModel: false })
    } catch (e) {
      this.setState({ badModel: true })
    }
  }

  fetchData = () => {
    const dataSource = this.inputField.value

    axios.get(dataSource).then((response) => {
      const csvData = response.data
      const dataModel = response.data !== '' ? JSON.stringify(dataProvider(dataSource), undefined, 2) : '{}'

      if (csvData !== '') {
        this.setState({ dataModel, csvData, badRequest: false })
      } else {
        this.setState({ dataModel: '{}', csvData, badRequest: true })
      }
    })
    .catch(() => {
      this.setState({ dataModel: '{}', csvData: '', badRequest: true })
    })
  }

  render() {
    const { badRequest, badModel, dataModel, csvData } = this.state
    const { defaultSource } = this.props

    const badRequestStyle = {
      outline: badRequest ? '2px solid red' : '',
    }
    const badModelStyle = {
      outline: badModel ? '2px solid red' : '',
    }

    return (
      <div>
        <HeaderText text="Choose data-source:" />
        <input
          ref={(ref) => { this.inputField = ref }}
          defaultValue={defaultSource}
          onBlur={this.onBlurInput}
          type="text"
          className={styles.sourceInput}
          style={badRequestStyle}
        />
        <textarea
          ref={(ref) => { this.textareaField = ref }}
          value={dataModel}
          onChange={this.onChangeTextarea}
          className={styles.jsonViewer}
          style={badModelStyle}
        />
        <button
          type="button"
          className={styles.applyBtn}
          onClick={this.onClickApply}
          disabled={csvData === ''}
        >
          Apply
        </button>
      </div>
    )
  }
}

CsvModelApplier.propTypes = {
  defaultSource: PropTypes.string,
  onApply: PropTypes.func,
}
