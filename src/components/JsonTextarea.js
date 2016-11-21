import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import styles from './JsonTextarea.css'

export default class JsonTextarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonText: JSON.stringify(props.jsonObject, undefined, 2),
    }
  }

  componentDidMount = () => {
    const { jsonObject, onChange } = this.props
    onChange(this.textareaField.value)
    this.setState({ jsonText: JSON.stringify(jsonObject, undefined, 2) })
  }

  componentWillReceiveProps = (nextProps) => {
    const { jsonObject } = this.props
    if (!isEqual(jsonObject, nextProps.jsonObject)) {
      this.setState({ jsonText: JSON.stringify(nextProps.jsonObject, undefined, 2) })
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
  jsonObject: PropTypes.objectOf(PropTypes.array),
  jsonError: PropTypes.bool,
  onChange: PropTypes.func,
}
