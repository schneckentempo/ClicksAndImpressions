import React, { Component, PropTypes } from 'react'
import HeaderText from './HeaderText'
import styles from './CsvMappingApplier.css'
import getDataMapping from '../utils/getMappingFromDatasource'

const axios = require('axios')

export default class CsvMappingApplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapping: JSON.stringify(getDataMapping(props.defaultDataSource), undefined, 2),
      csvData: '',
      badRequest: false,
      badMapping: false,
    }
  }

  componentDidMount = () => {
    const { defaultDataSource } = this.props

    if (defaultDataSource !== '') {
      this.fetchData()
    }
  }

  onBlurInput = () => {
    this.fetchData()
  }

  onChangeTextarea = () => {
    const mapping = this.textareaField.value

    this.setState({ mapping })
  }

  onClickApply = () => {
    const { csvData, mapping } = this.state
    const { onApply } = this.props

    try {
      onApply(csvData, JSON.parse(mapping))
      this.setState({ badMapping: false })
    } catch (e) {
      this.setState({ badMapping: true })
    }
  }

  fetchData = () => {
    const dataSource = this.inputField.value

    axios.get(dataSource).then((response) => {
      const csvData = response.data
      const mapping = response.data !== '' ? JSON.stringify(getDataMapping(dataSource), undefined, 2) : '{}'

      if (csvData !== '') {
        this.setState({ mapping, csvData, badRequest: false })
      } else {
        this.setState({ mapping: '{}', csvData, badRequest: true })
      }
    })
    .catch(() => {
      this.setState({ mapping: '{}', csvData: '', badRequest: true })
    })
  }

  render() {
    const { badRequest, badMapping, mapping, csvData } = this.state
    const { defaultDataSource } = this.props

    const badRequestStyle = {
      outline: badRequest ? '2px solid red' : '',
    }
    const badMappingStyle = {
      outline: badMapping ? '2px solid red' : '',
    }

    return (
      <div>
        <HeaderText text="Choose data-source:" />
        <input
          ref={(ref) => { this.inputField = ref }}
          defaultValue={defaultDataSource}
          onBlur={this.onBlur}
          type="text"
          className={styles.sourceInput}
          style={badRequestStyle}
        />
        <textarea
          ref={(ref) => { this.textareaField = ref }}
          value={mapping}
          onChange={this.onChangeTextarea}
          className={styles.jsonViewer}
          style={badMappingStyle}
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

CsvMappingApplier.propTypes = {
  defaultDataSource: PropTypes.string,
  onApply: PropTypes.func,
}
