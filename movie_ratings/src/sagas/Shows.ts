import { call, put } from "redux-saga/effects";
import { Action } from "../actions";
import { loadCastDetail, loadShowDetail, searchShowList } from "../api";
import {
  castsDetailsAction,
  loadCastsAction,
  showDetailsAction,
  showsLoadedAction,
} from "../actions/Shows";

export function* fetchShows(action: Action): Generator {
  const shows = yield call(searchShowList, action.payload);
  yield put(showsLoadedAction(shows));
}

export function* fetchShowDetail(action: Action): Generator<any, any, any> {
  const show = yield call(loadShowDetail, action.payload);
  yield put(showDetailsAction(show));
}

export function* fetchCastDetail(action: Action): Generator {
  try {
    const casts = yield call(loadCastDetail, action.payload);
    console.log("Saga - Fetched Casts:", casts); // Debugging line
    yield put(castsDetailsAction(casts));
  } catch (error) {
    console.error("Saga - Error fetching casts:", error);
  }
}
