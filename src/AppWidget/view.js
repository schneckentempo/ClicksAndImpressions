import React from 'react'
import { view, forwardTo } from 'redux-elm'
import AppView from '../App/view'
import { addWidget } from '../actions'
import styles from './styles.css'

export default view(({ model, dispatch }) => (
  <div className={styles.container}>
    {
      (model.widgetList.length === 0)
      ? ''
      : model.widgetList.map((app, index) =>
        <div key={index}>
          <AppView
            model={app}
            dispatch={forwardTo(dispatch, 'App', index)}
          />
        </div>
      )
    }
    <button
      className={styles.addWidgetButton}
      onDoubleClick={() => dispatch(addWidget())}
    >
      +
    </button>
  </div>
  )
)
