import { ActionCreator } from ".";
import { Show } from "../models/Show";

export const SHOWS_LOADED = "{SHOWS_LOADED}";

export const showsLoadedAction: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});

export const SHOWS_QUERY_CHANGE = "{SHOWS_QUERY_CHANGE}";

export const showsQueryChangeAction: ActionCreator<{ query: string }> = (
  query
) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
});

export const SHOW_DETAILS_LOADED = "{SHOW_DETAILS}";

export const showDetailsAction: ActionCreator<Show> = (shows: Show) => ({
  type: SHOW_DETAILS_LOADED,
  payload: shows,
});

export const LOAD_SHOW_ACTION = "{LOAD_SHOW_ACTION}";

export const loadShowAction: ActionCreator<number> = (showId: number) => ({
  type: LOAD_SHOW_ACTION,
  payload: showId,
});
