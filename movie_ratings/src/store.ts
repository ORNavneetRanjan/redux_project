import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import showsReducer from "./slices/Shows";
import { debounce, takeEvery } from "redux-saga/effects";
import { fetchShows, fetchShowDetail, fetchCastDetail } from "./sagas/Shows";
import {
  showsQueryChangeAction,
  loadShowDetailAction,
  castsDetailsAction,
} from "./slices/Shows";

function* rootSaga() {
  yield debounce(100, showsQueryChangeAction, fetchShows);
  yield takeEvery(loadShowDetailAction, fetchShowDetail);
  yield takeEvery(castsDetailsAction, fetchCastDetail);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    shows: showsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;
export default store;
