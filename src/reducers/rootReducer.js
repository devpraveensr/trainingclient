import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import trainingsReducer from './trainingsReducer';
import trainingProvidersReducer from './trainingProvidersReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import voucherReducer from './voucherReducer';

export default combineReducers({
  settingsReducer,
  trainingsReducer,
  trainingProvidersReducer,
  userReducer,
  roleReducer,
  voucherReducer
})