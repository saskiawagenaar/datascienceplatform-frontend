import { combineReducers } from 'redux';
import locationReducer from '../reducers/location';
import wrangleReducer from '../reducers/wrangleReducer';
import userReducer from '../reducers/userReducer';
import uploadReducer from '../reducers/uploadReducer';
import { combineForms } from 'react-redux-form';
import { initialFileDescription } from '../constants/initialFormStates';

import basketReducer from '../reducers/basketReducer';
export const makeRootReducer = () => {

  return combineReducers({
    location: locationReducer,
    wranglerState: wrangleReducer,
    userState: userReducer,
    basketState: basketReducer,
    fileDescriptionState: combineForms({
      fileDescription: ""
    })
  });
};
export default makeRootReducer;
