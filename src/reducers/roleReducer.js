import appConfig from '../appconfig.js';
import * as moment from 'moment';

const roleReducer = (state = {roles : appConfig.roles}, action) => {
  if(action.type === 'SET_ROLES') {
    let newRoles = [];
    if(action.payload.length) {
      action.payload.forEach(rl => {
        newRoles.push(rl)
      })
    }
    return {
      ...state, 
      roles: {
        ...state.roles,
        Roles: newRoles
      }
      
    }
  }
  return state
}

export default roleReducer