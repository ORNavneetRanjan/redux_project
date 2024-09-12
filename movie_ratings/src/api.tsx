import axios from "axios";
import { Show } from "./models/Show";

export const searchShowList = async (keyword: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${keyword}`
    );
    return response.data.map((item: any) => item.show);
  } catch (error) {
    console.error("Error fetching show list:", error);
    throw error;
  }
};

export const searchShows = async (keyword: string) => {
  const response = await axios.get<{ show: Show }[]>(
    `https://api.tvmaze.com/search/shows?q=${keyword}`
  );
  const shows = response.data.map((item) => item.show);
  const castPromises = [];
  for (let i = 0; i < shows.length; i++) {
    castPromises.push(getCast(shows[i]));
  }
  return Promise.all(castPromises);
};

export const getCast = async (show: Show) => {
  const castReponse = await axios.get(
    `https://api.tvmaze.com/shows/${show.id}/cast`
  );
  const cast = castReponse.data.map((item: any) => item);
  return { show, cast };
};

export const loadShowDetail = async (showId: number) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading show detail:", error);
    throw error;
  }
};

export const loadCastDetail = async (showId: number) => {
  console.log("api called");
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}/cast`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cast details:", error);
    throw error;
  }
};
