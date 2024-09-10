import axios from "axios";

export const searchShowList = (keyword: string) => {
  return axios
    .get("https://api.tvmaze.com/search/shows?q=" + keyword)
    .then((response) => response.data.map((item: any) => item.show));
};

export const loadShowDetail = (showId: number) => {
  return axios
    .get("https://api.tvmaze.com/shows/" + showId)
    .then((response) => response.data);
};
