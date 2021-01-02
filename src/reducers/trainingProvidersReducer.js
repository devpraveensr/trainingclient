import appConfig from '../appconfig.js';
import * as moment from 'moment';

const trainingProvidersReducer = (state = {trainingproviders : appConfig.trainingproviders}, action) => {
  if(action.type === 'SET_TRAININGPROVIDERS') {
    let newTrainingProviders = [];
    if(action.payload.length) {
      action.payload.forEach(trn => {
        newTrainingProviders.push(trn)
      })
    }
    return {
      ...state, 
      trainingproviders: {
        ...state.trainingproviders,
        TrainingProviders: newTrainingProviders
      }
      
    }
  }
  return state
}

export default trainingProvidersReducer