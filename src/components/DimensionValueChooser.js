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

  componentDidMount = () => {
    document.body.addEventListener('click', this.onClickBody)
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

  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.onClickBody)
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

  onClickInput = () => {
    const { options } = this.props
    const inputText = this.inputField.value

    this.setState({
      closed: !(
        inputText.length === 0 ||
        (inputText.length !== 0 && filterOptions(options, inputText).length > 1)
      ),
    })
  }

  onClickBody = () => {
    this.setState({ closed: true })
  }

  render() {
    const { options } = this.props
    const { inputText, closed } = this.state

    const containerStyle = {
      position: 'relative',
      width: 300,
    }

    const ulStyle = {
      listStyleType: 'none',
      width: '100%',
      padding: 0,
      margin: 0,
    }

    const ulWrapperStyle = {
      position: 'absolute',
      boxSizing: 'border-box',
      top: 27,
      left: 0,
      width: '100%',
      maxHeight: 200,
      overflow: 'auto',
      borderRadius: '0px 0px 2px 2px',
      border: '1px solid #AAAAAA',
      backgroundColor: '#EFEFEF',
      display: closed ? 'none' : 'block',
    }

    const inputStyle = {
      width: 294,
      lineHeight: 2,
      color: '#333333',
      border: '1px solid #AAAAAA',
      borderRadius: closed ? 4 : '4px 4px 0px 0px',
      padding: 0,
      margin: 0,
      paddingLeft: 4,
    }

    return (
      <div style={containerStyle}>
        <div>
          <input
            style={inputStyle}
            type="text"
            onChange={this.onChangeInput}
            onClick={this.onClickInput}
            ref={(ref) => { this.inputField = ref }}
            value={inputText}
          />
        </div>
        <div style={ulWrapperStyle}>
          <ul style={ulStyle}>
            {filterOptions(options, inputText).map((dimensionValueObject, i) => (
              <ListItem
                key={`li_${i}`}
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
