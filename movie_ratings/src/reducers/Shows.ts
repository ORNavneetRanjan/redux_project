import { AnyAction } from "redux";
import { Show } from "../models/Show";
import {
  SHOW_DETAILS_LOADED,
  SHOWS_LOADED,
  SHOWS_QUERY_CHANGE,
} from "../actions/Shows";
import { produce } from "immer";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query: string;
};

export const initialState: State = { shows: {}, query: "" };

export default function ShowReducer(
  currentState = initialState,
  action: AnyAction
): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(currentState, (draft) => {
        const shows = action.payload as Show[];

        const showSchema = new schema.Entity("shows");
        const normalizedData = normalize(shows, [showSchema]);
        draft.shows = normalizedData.entities.shows || {};
      });
    case SHOWS_QUERY_CHANGE:
      return produce(currentState, (draft) => {
        draft.query = action.payload;
      });
    case SHOW_DETAILS_LOADED:
      return produce(currentState, (draft) => {
        const show = action.payload as Show;
        draft.shows[show.id] = show;
      });
    default:
      return currentState;
  }
}
