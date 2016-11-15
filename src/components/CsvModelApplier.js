import React, { Component } from 'react'
import HeaderText from './HeaderText'
import styles from './CsvModelApplier.css'

export default class CsvModelApplier extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: '',
    }
  }

  render() {
    return (
      <div>
        <HeaderText text="Choose data-source:" />
        <input type="text" className={styles.sourceInput} />
        <br />
        <br />
        <textarea className={styles.jsonViewer} />
        <br />
        <br />
        <button className={styles.applyBtn}>Apply</button>
      </div>
    )
  }
}
