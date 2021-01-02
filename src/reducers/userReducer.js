import appConfig from '../appconfig.js';
import * as moment from 'moment';

const userReducer = (state = {users : appConfig.users}, action) => {
  
  if(action.type === 'SET_USERS') {
    let newUsers;
    // console.log(action.payload)
    if(action.payload.length) {
      newUsers = [];
      action.payload.forEach(usr => {
        newUsers.push(usr)
      })
    } else if(Object.keys(action.payload).length) {
      newUsers = state.users.Users;
      newUsers.push(action.payload)
    }
    // console.log(newTrainings)
    return {
      ...state, 
      users: {
        ...state.users,
        Users: newUsers
      }
    }
  }
  if(action.type === 'UPDATE_USERS') {
    let newUsers = state.users.Users;
    let selIndex = false;
    newUsers.map((usr, usrIndex) => {
      if(usr._id === action.payload._id) {
        selIndex = usrIndex
      }
    })
    // console.log(selIndex, action.payload, newTrainings[selIndex])
    if(selIndex !== false) {
      newUsers[selIndex] = action.payload;
    }
    // console.log(newTrainings[selIndex])
    return {
      ...state, 
      users: {
        ...state.users,
        Users: newUsers
      }
    }
  }
  if(action.type === 'DELETE_USERS') {
    let newUsers = state.users.Users;
    if(action.payload) {
      newUsers[action.payload].status = false;
      // newUsers.splice(action.payload, 1);
    }
    return {
      ...state, 
      users: {
        ...state.users,
        Users: newUsers
      }
    }
  }
  
  return state
}

export default userReducer