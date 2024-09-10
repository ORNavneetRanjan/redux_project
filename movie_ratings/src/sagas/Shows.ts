import { call, put } from "redux-saga/effects";
import { Action } from "../actions";
import { loadShowDetail, searchShowList } from "../api";
import { showDetailsAction, showsLoadedAction } from "../actions/Shows";

export function* fetchShows(action: Action): Generator {
  const shows = yield call(searchShowList, action.payload);
  yield put(showsLoadedAction(shows));
}

export function* fetchShowDetail(action: Action): Generator<any, any, any> {
  const show = yield call(loadShowDetail, action.payload);
  yield put(showDetailsAction(show));
}
