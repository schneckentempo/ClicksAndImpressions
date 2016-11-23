import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import styles from './JsonTextarea.css'

export default class JsonTextarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonText: JSON.stringify(props.jsonText, undefined, 2),
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { jsonText, onChange } = this.props
    if (!isEqual(jsonText, nextProps.jsonText)) {
      this.setState({ jsonText: nextProps.jsonText })
    }
  }

  onChangeJsonTextarea = () => {
    const { onChange } = this.props
    const jsonText = this.textareaField.value

    this.setState({ jsonText })
    onChange(jsonText)
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
