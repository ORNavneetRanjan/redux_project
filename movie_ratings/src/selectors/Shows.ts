import { createSelector } from "reselect";
import { State } from "../store";
const showsStateSelector = (state: State) => state.shows;

export const showsQuerySelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.query
);

export const showsMapSelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.shows
);

export const queryShowsMapSelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.query_shows
);

export const showsLoadingSelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.loading
);

export const showsSelector = createSelector(
  showsMapSelector,
  showsQuerySelector,
  queryShowsMapSelector,
  (showsMap, query, queryShowsMap) =>
    queryShowsMap[query]
      ? queryShowsMap[query].map((showId) => showsMap[showId])
      : []
);

export const castSelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.casts
);
