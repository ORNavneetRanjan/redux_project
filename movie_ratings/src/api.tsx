import axios from "axios";

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
    console.log("here is api ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cast details:", error);
    throw error;
  }
};
