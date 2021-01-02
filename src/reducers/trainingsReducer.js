import appConfig from '../appconfig.js';
import * as moment from 'moment';

const trainingsReducer = (state = {trainings : appConfig.trainings}, action) => {
  
  if(action.type === 'SET_TRAININGS') {
    let newTrainings
    // console.log(action.payload)
    if(action.payload.length) {
      newTrainings = [];
      action.payload.forEach(trn => {
        newTrainings.push(trn)
      })
    } else if(Object.keys(action.payload).length) {
      newTrainings = state.trainings.Trainings;
      newTrainings.push(action.payload)
    }
    // console.log(newTrainings)
    return {
      ...state, 
      trainings: {
        ...state.trainings,
        Trainings: newTrainings
      }
    }
  }
  if(action.type === 'UPDATE_TRAININGS') {
    let newTrainings = state.trainings.Trainings;
    let selIndex = false;
    newTrainings.map((trn, trnIndex) => {
      if(trn._id === action.payload._id) {
        selIndex = trnIndex
      }
    })
    // console.log(selIndex, action.payload, newTrainings[selIndex])
    if(selIndex !== false) {
      newTrainings[selIndex] = action.payload;
    }
    // console.log(newTrainings[selIndex])
    return {
      ...state, 
      trainings: {
        ...state.trainings,
        Trainings: newTrainings
      }
    }
  }
  if(action.type === 'DELETE_TRAININGS') {
    let newTrainings = state.trainings.Trainings;
    if(action.payload) {
      newTrainings.splice(action.payload, 1);
    }
    return {
      ...state, 
      trainings: {
        ...state.trainings,
        Trainings: newTrainings
      }
    }
  }
  
  return state
}

export default trainingsReducer