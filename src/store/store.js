import { combineReducers, legacy_createStore } from "redux";
import { dateReducer } from "./dateReducers";
import { modalReducer } from "./modalReducer";
import { timeReducer } from "./timeReducer";

const rootReducer = combineReducers({
  date: dateReducer,
  modal: modalReducer,
  time: timeReducer,
});

export const store = legacy_createStore(rootReducer);
