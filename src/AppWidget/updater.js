import { Updater, Matchers } from 'redux-elm'
import * as ActionTypes from '../constants/ActionTypes'
import appUpdater, { initialModel as appInitialModel } from '../App/updater'

const initialModel = {
  widgetList: [],
}

export default new Updater(initialModel)
  .case('App', (model, action) => {
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
  }, Matchers.parameterizedMatcher)
  .case(ActionTypes.ADD_WIDGET, model => ({
    ...model,
    widgetList: [
      ...model.widgetList,
      appUpdater(),
    ],
  }))
  .toReducer()
