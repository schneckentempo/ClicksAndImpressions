import React, { Component, PropTypes } from 'react'
import { find } from 'lodash'

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

  componentWillReceiveProps = (props) => {
    this.setState({ inputText: props.value })
  }

  onChangeInput = () => {
    const { options, onChange } = this.props
    const inputText = this.inputField.value

    this.setState({ inputText, closed: inputText.length === 0 })

    if (validOption(options, inputText)) {
      onChange(inputText)
    } else {
      onChange('')
    }
  }

  onClickDimensionValue = (dimensionValue) => {
    const { onChange } = this.props

    this.setState({ inputText: dimensionValue })
    onChange(dimensionValue)
  }

  render() {
    const { options } = this.props
    const { inputText } = this.state

    const containerStyle = {
      width: 300,
    }
    const liStyle = {
      width: '100%',
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    }

    const ulStyle = {
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

    const aBtnStyle = {
      boxSizing: 'border-box',
      display: 'block',
      backgroundColor: 'lightgrey',
      padding: 5,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
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
              <li key={i} style={liStyle}>
                <a
                  tabIndex={i}
                  style={aBtnStyle}
                  onClick={this.onClickDimensionValue.bind(this, dimensionValueObject.value)}
                >
                  {dimensionValueObject.label}
                </a>
              </li>
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
