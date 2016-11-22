import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderText from './HeaderText'
import JsonTextarea from './JsonTextarea'
import styles from './CsvMappingApplier.css'
import { fetchCsvData, changeMapping } from '../actions'
import getMappingFromDatasource from '../utils/getMappingFromDatasource'

class CsvMappingApplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.defaultDataSource,
      unparsedMapping: '',
      badMapping: false,
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
      this.setState({ unparsedMapping, badMapping: false })
    } catch (e) {
      this.setState({ unparsedMapping, badMapping: true })
    }
  }

  onBlurInput = () => {
    const dataSource = this.inputField.value
    this.setState({
      unparsedMapping: JSON.stringify(getMappingFromDatasource(dataSource), undefined, 2),
      dataSource,
    })
  }

  onClickApply = () => {
    const dataSource = this.inputField.value
    const { unparsedMapping } = this.state
    const { fetchData, changeMappingHandler } = this.props

    try {
      fetchData(dataSource)
      const parsedMapping = JSON.parse(unparsedMapping)
      changeMappingHandler(parsedMapping)
      this.setState({ badMapping: false })
    } catch (e) {
      this.setState({ badMapping: true })
    }
  }

  render() {
    const { dataSource, unparsedMapping, badMapping } = this.state
    const { badRequest, defaultDataSource } = this.props

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
          onClick={this.onClickApply}
          disabled={badMapping || dataSource === ''}
        >
          Apply
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({
    defaultDataSource,
    csvData,
    mapping,
    badRequest,
}) => ({
  defaultDataSource,
  csvData,
  mapping,
  badRequest,
})

const mapDispatchToProps = dispatch => ({
  fetchData: dataSource => dispatch(fetchCsvData(dataSource)),
  changeMappingHandler: mapping => dispatch(changeMapping(mapping)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CsvMappingApplier)

CsvMappingApplier.propTypes = {
  defaultDataSource: PropTypes.string,
  badRequest: PropTypes.bool,
  fetchData: PropTypes.func,
  changeMappingHandler: PropTypes.func,
}
