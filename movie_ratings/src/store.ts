import { applyMiddleware, combineReducers, createStore } from "redux";
import ShowReducer from "./reducers/Shows";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import { debounce, takeEvery } from "redux-saga/effects";
import {
  LOAD_CAST_ACTION,
  LOAD_SHOW_ACTION,
  SHOWS_QUERY_CHANGE,
} from "./actions/Shows";
import { fetchShows, fetchShowDetail, fetchCastDetail } from "./sagas/Shows";

const reducer = combineReducers({
  shows: ShowReducer,
});

function* rootSaga() {
  yield debounce(100, SHOWS_QUERY_CHANGE, fetchShows);
  yield takeEvery(LOAD_SHOW_ACTION, fetchShowDetail);
  yield takeEvery(LOAD_CAST_ACTION, fetchCastDetail);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;
export default store;
