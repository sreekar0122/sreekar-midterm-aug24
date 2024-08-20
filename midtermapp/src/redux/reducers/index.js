import { combineReducers } from 'redux';
import userReducer from '.';

const rootReducer = combineReducers({
    user: userReducer,
    // other reducers
});

export default rootReducer;