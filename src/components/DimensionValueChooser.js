import React, { Component, PropTypes } from 'react'
import { find } from 'lodash'
import ListItem from './ListItem'

const filterOptions = (options, text) =>
  options.filter(option => option.label.toLowerCase().includes(text.toLowerCase()))

const validOption = (options, text) => find(options, option => option.label === text)

export default class DimensionValueChooser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: props.value,
      closed: true,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { value, options, onChange } = this.props
    let inputText = nextProps.value

    if (inputText === null || inputText === undefined) {
      inputText = ''
    }

    if (value !== inputText) {
      this.setState({
        inputText,
        closed: inputText.length === 0 || validOption(options, inputText),
      })

      if (validOption(options, inputText)) {
        onChange(inputText)
      } else {
        onChange('')
      }
    }
  }

  onChangeInput = () => {
    const { options, onChange } = this.props
    const inputText = this.inputField.value

    this.setState({ inputText, closed: inputText.length === 0 || validOption(options, inputText) })

    if (validOption(options, inputText)) {
      onChange(inputText)
    } else {
      onChange('')
    }
  }

  onClickDimensionValue = (dimensionValue) => {
    const { options, onChange } = this.props
    const inputText = this.inputField.value

    this.setState({ inputText: dimensionValue, closed: !validOption(options, inputText) })
    onChange(dimensionValue)
  }

  render() {
    const { options } = this.props
    const { inputText } = this.state

    const containerStyle = {
      width: 300,
    }

    const ulStyle = {
      listStyleType: 'none',
      width: '100%',
      padding: 0,
      margin: 0,
    }

    const ulWrapperStyle = {
      width: '100%',
      borderRadius: '0px 0px 5px 5px',
      border: '1px solid grey',
      display: this.state.closed ? 'none' : 'block',
    }

    const inputStyle = {
      width: '100%',
      lineHeight: '1.5em',
      padding: 0,
      margin: 0,
      paddingLeft: 4,
    }

    return (
      <div style={containerStyle}>
        <input
          style={inputStyle}
          type="text"
          onChange={this.onChangeInput}
          ref={(ref) => { this.inputField = ref }}
          value={inputText}
        />
        <div style={ulWrapperStyle}>
          <ul style={ulStyle}>
            {filterOptions(options, inputText).map((dimensionValueObject, i) => (
              <ListItem
                key={i}
                index={i}
                item={dimensionValueObject}
                onItemClick={this.onClickDimensionValue}
              />
              )
            )
          }
          </ul>
        </div>
      </div>
    )
  }
}

DimensionValueChooser.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
}
