import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import styles from './JsonTextarea.css'

export default class JsonTextarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonText: '',
    }
  }

  componentDidMount = () => {
    const { jsonText, onChange } = this.props
    onChange(this.textareaField.value)
    this.setState({ jsonText: JSON.stringify(jsonText, undefined, 2) })
  }

  componentWillReceiveProps = (nextProps) => {
    const { jsonText } = this.props
    if (!isEqual(jsonText, nextProps.jsonText)) {
      this.setState({ jsonText: nextProps.jsonText })
    }
  }

  onChangeJsonTextarea = () => {
    const { onChange } = this.props
    onChange(this.textareaField.value)
    const jsonText = this.textareaField.value

    this.setState({ jsonText })
  }

  render() {
    const { jsonText } = this.state
    const { jsonError } = this.props

    const jsonErrorStyle = {
      outline: jsonError ? '2px solid red' : '',
    }

    return (<textarea
      ref={(ref) => { this.textareaField = ref }}
      value={jsonText}
      onChange={this.onChangeJsonTextarea}
      className={styles.jsonViewer}
      style={jsonErrorStyle}
    />)
  }
}

JsonTextarea.propTypes = {
  jsonText: PropTypes.string,
  jsonError: PropTypes.bool,
  onChange: PropTypes.func,
}
