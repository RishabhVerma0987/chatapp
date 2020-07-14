import { combineReducers } from "redux";
import { ProcessReducer } from "./process";
const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});

export default rootReducers;
