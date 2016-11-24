import React, { Component, PropTypes } from 'react'
import { find } from 'lodash'
import ListItem from './ListItem'
import styles from './DimensionValueChooser.css'

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

    const ulWrapperStyle = {
      display: closed ? 'none' : 'block',
    }

    const inputStyle = {
      borderRadius: closed ? '4px' : '4px 4px 0px 0px',
    }

    return (
      <div className={styles.container}>
        <div>
          <input
            className={styles.inputBox}
            style={inputStyle}
            type="text"
            onChange={this.onChangeInput}
            onClick={this.onClickInput}
            ref={(ref) => { this.inputField = ref }}
            value={inputText}
          />
        </div>
        <div className={styles.ulWrapper} style={ulWrapperStyle}>
          <ul className={styles.ulItem}>
            {options && options.length > 0 &&
              filterOptions(options, inputText).map((dimensionValueObject, i) => (
                <ListItem
                  key={`li_${i}`}
                  index={i}
                  item={dimensionValueObject}
                  onItemClick={this.onClickDimensionValue}
                />
                )
              )
            }
            {(options && filterOptions(options, inputText).length === 0) &&
              <div className={styles.noResults}>
                No results found
              </div>
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
