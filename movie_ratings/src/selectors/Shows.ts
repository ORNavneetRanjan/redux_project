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

export const showsSelector = createSelector(showsMapSelector, (showsMap) =>
  Object.keys(showsMap).map((showId) => showsMap[+showId])
);
