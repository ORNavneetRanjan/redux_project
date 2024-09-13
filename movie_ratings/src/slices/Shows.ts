import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, Show } from "../models/Show";
import { normalize, schema } from "normalizr";
import { State } from "../reducers/Shows";

type ShowState = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
  casts: Person[];
};

const initialState: ShowState = {
  shows: {},
  query_shows: {},
  query: "",
  show_loading: {},
  loading: false,
  casts: [],
};

const showsSlice = createSlice({
  name: "shows",
  initialState: initialState,
  reducers: {
    showsLoaded: showsLoaded,
    showsQueryChange: showsQueryChange,
    showDetails: showDetails,
    castsLoaded: castsLoaded,
    loadShowDetail: loadShowDetail,
  },
});

function showsLoaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  const showSchema = new schema.Entity("shows");

  const normalizedData = normalize(shows, [showSchema]);
  state.loading = false;
  state.query_shows[state.query] = normalizedData.result;
  state.shows = { ...state.shows, ...normalizedData.entities.shows };
}

function showsQueryChange(state: State, action: PayloadAction<string>) {
  state.query = action.payload;
  state.loading = true;
}

function loadShowDetail(state: State, action: PayloadAction<number>) {
  state.show_loading[action.payload] = false;
}

function showDetails(state: State, action: PayloadAction<Show>) {
  const show = action.payload as Show;
  state.shows[show.id] = show;
}

function castsLoaded(state: State, action: PayloadAction<Person[]>) {
  const casts = action.payload as Person[];
  console.log("Reducer - Loaded Casts:", casts); // Debugging line
  state.casts = casts;
}

const { actions, reducer: showsReducer } = showsSlice;

export const {
  showsLoaded: showsLoadedAction,
  showsQueryChange: showsQueryChangeAction,
  showDetails: showDetailsAction,
  castsLoaded: castsDetailsAction,
  loadShowDetail: loadShowDetailAction,
} = actions;

export default showsReducer;
