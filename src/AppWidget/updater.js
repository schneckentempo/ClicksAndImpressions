import { Updater, Matchers } from 'redux-elm'
import * as ActionTypes from '../constants/ActionTypes'
import appUpdater, { initialModel as appInitialModel } from '../App/updater'

const initialModel = {
  widgetList: [appUpdater(appInitialModel)],
}

const handleForwardToApp = (model, action) => {
  const appIndex = parseInt(action.matching.args.param, 10)

  return {
    ...model,
    widgetList: model.widgetList.map((appModel, index) => {
      if (index === appIndex) {
        return appUpdater(appModel, action)
      }
      return appModel
    }),
  }
}

const handleAddWidget = model => ({
  ...model,
  widgetList: [
    ...model.widgetList,
    appUpdater(appInitialModel),
  ],
})

export default new Updater(initialModel)
  .case('App', handleForwardToApp, Matchers.parameterizedMatcher)
  .case(ActionTypes.ADD_WIDGET, handleAddWidget)
  .toReducer()
