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
      unparsedMapping: '',
      badMapping: false,
    }
  }

  componentDidMount = () => {
    const { fetchData, defaultDataSource } = this.props

    if (defaultDataSource !== '') {
      fetchData(defaultDataSource)
      this.setState({
        unparsedMapping: JSON.stringify(getMappingFromDatasource(defaultDataSource), undefined, 2),
      })
    }
  }

  onChangeJsonTextarea = (unparsedMapping) => {
    this.setState({ unparsedMapping })
  }

  onBlurInput = () => {
    const { fetchData } = this.props
    const dataSource = this.inputField.value
    fetchData(dataSource)
    this.setState({
      unparsedMapping: JSON.stringify(getMappingFromDatasource(dataSource), undefined, 2),
    })
  }

  onClickApply = () => {
    const { unparsedMapping } = this.state
    const { csvData, onApply, changeMappingHandler } = this.props

    try {
      const parsedMapping = JSON.parse(unparsedMapping)
      changeMappingHandler(parsedMapping)
      onApply(csvData, parsedMapping)
      this.setState({ badMapping: false })
    } catch (e) {
      this.setState({ badMapping: true })
    }
  }

  render() {
    const { unparsedMapping } = this.state
    const { csvData, badRequest, defaultDataSource } = this.props

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
          jsonError={this.state.badMapping}
          onChange={this.onChangeJsonTextarea}
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

const mapStateToProps = ({
  csvMapping: {
    defaultDataSource,
    csvData,
    mapping,
    badRequest,
  },
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
  onApply: PropTypes.func,
  badRequest: PropTypes.bool,
  fetchData: PropTypes.func,
  mapping: PropTypes.objectOf(PropTypes.array),
  csvData: PropTypes.string,
  changeMappingHandler: PropTypes.func,
}
