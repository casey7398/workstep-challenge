import { combineReducers } from "redux";
import applicantsReducer from './applicantsReducer';

const reducers = combineReducers({
    applicants: applicantsReducer
});

export default reducers