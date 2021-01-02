import appConfig from '../appconfig.js';
import * as moment from 'moment';

const settingsReducer = (state = {settings: appConfig.settings}, action) => {
  if(action.type === 'SET_LOGIN_USER') {
    return {
      ...state,
      settings: {
        ...state.settings,
        logindata: action.payload,
        http: {
          ...state.settings.http,
          headers: {
            ...state.settings.http.headers,
            "Authorization": action.payload.token
          }
        }
      }
    }
  }
  
  return state
}

export default settingsReducer