import { combineReducers } from 'redux';
// import reducer from './reducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import logoutReducer from './logoutReducer';

export default combineReducers({
    signupReducer,
    signinReducer,
    logoutReducer
});