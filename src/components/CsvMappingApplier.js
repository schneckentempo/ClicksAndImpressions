import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderText from './HeaderText'
import styles from './CsvMappingApplier.css'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'
import { fetchDataBadRequest, parseDataMappingError } from '../actions'

const axios = require('axios')

class CsvMappingApplier extends Component {
  constructor(props) {
    console.log(props.defaultDataSource)
    super(props)
    this.state = {
      mapping: JSON.stringify(props.mapping, undefined, 2),
      csvData: '',
      // badRequest: false,
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
      const mapping = response.data !== '' ? JSON.stringify(getMappingFromDatasource(dataSource), undefined, 2) : '{}'

      if (csvData !== '') {
        this.setState({ mapping, csvData })
      } else {
        this.setState({ mapping: '{}', csvData })
      }
    })
    .catch(() => {
      this.setState({ mapping: '{}', csvData: '' })
    })
  }

  render() {
    const { mapping, csvData, badMapping } = this.state
    const { badRequest, defaultDataSource } = this.props
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
          onBlur={this.onBlurInput}
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

const mapStateToProps = ({ csvMapping: { badRequest } }) => ({
  badRequest,
})

export default connect(mapStateToProps)(CsvMappingApplier)

CsvMappingApplier.propTypes = {
  defaultDataSource: PropTypes.string,
  onApply: PropTypes.func,
  badRequest: PropTypes.bool,
  mapping: PropTypes.objectOf(PropTypes.array),
  badRequest: PropTypes.bool,
}
