import { AnyAction } from "redux";
import { Person, Show } from "../models/Show";
import {
  CASTS_LOADED,
  SHOW_DETAILS_LOADED,
  SHOWS_LOADED,
  SHOWS_QUERY_CHANGE,
} from "../actions/Shows";
import { produce } from "immer";
import { normalize, schema } from "normalizr";

export type State = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
  casts: Person[];
};

export const initialState: State = {
  shows: {},
  query_shows: {},
  query: "",
  show_loading: {},
  loading: false,
  casts: [],
};

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
        draft.loading = false;
        draft.query_shows[draft.query] = normalizedData.result;
        draft.shows = { ...draft.shows, ...normalizedData.entities.shows };
      });
    case SHOWS_QUERY_CHANGE:
      return produce(currentState, (draft) => {
        draft.query = action.payload;
        draft.loading = true;
      });
    case SHOW_DETAILS_LOADED:
      return produce(currentState, (draft) => {
        const show = action.payload as Show;
        draft.shows[show.id] = show;
      });
    case CASTS_LOADED:
      return produce(currentState, (draft) => {
        const casts = action.payload as Person[];
        console.log("Reducer - Loaded Casts:", casts); // Debugging line
        draft.casts = casts;
      });

    default:
      return currentState;
  }
}
