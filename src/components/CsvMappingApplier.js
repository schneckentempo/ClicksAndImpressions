import React, { Component, PropTypes } from 'react'
import HeaderText from './HeaderText'
import JsonTextarea from './JsonTextarea'
import styles from './CsvMappingApplier.css'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'

export default class CsvMappingApplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.defaultDataSource,
      unparsedMapping: '',
    }
  }

  componentDidMount = () => {
    const { defaultDataSource } = this.props

    if (defaultDataSource !== '') {
      this.setState({
        unparsedMapping: JSON.stringify(getMappingFromDatasource(defaultDataSource), undefined, 2),
      })
    }
  }

  onChangeJsonTextarea = (unparsedMapping) => {
    try {
      JSON.parse(unparsedMapping)
      this.setState({ unparsedMapping })
    } catch (e) {
      this.setState({ unparsedMapping })
    }
  }

  onBlurInput = () => {
    const dataSource = this.inputField.value
    this.setState({
      unparsedMapping: JSON.stringify(getMappingFromDatasource(dataSource), undefined, 2),
      dataSource,
    })
  }

  handleClick = () => {
    const dataSource = this.inputField.value
    const { unparsedMapping } = this.state
    const { onClickApply } = this.props
    const badMapping = this.isBadMapping(unparsedMapping)
    if (!badMapping) {
      onClickApply({ appliedMapping: JSON.parse(unparsedMapping), dataSource })
    }
  }

  isBadMapping = (unparsedMapping) => {
    try {
      JSON.parse(unparsedMapping)
      return false
    } catch (e) {
      return true
    }
  }

  render() {
    const { dataSource, unparsedMapping } = this.state
    const { badRequest, defaultDataSource } = this.props

    const badMapping = this.isBadMapping(unparsedMapping)

    const badRequestStyle = {
      outline: badRequest ? '2px solid red' : '',
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
        <JsonTextarea
          jsonText={unparsedMapping}
          jsonError={badMapping}
          onChange={this.onChangeJsonTextarea}
        />
        <button
          type="button"
          className={styles.applyBtn}
          onClick={this.handleClick}
          disabled={badMapping || dataSource === ''}
        >
          Apply
        </button>
      </div>
    )
  }
}

CsvMappingApplier.propTypes = {
  defaultDataSource: PropTypes.string,
  badRequest: PropTypes.bool,
  onClickApply: PropTypes.func,
}
