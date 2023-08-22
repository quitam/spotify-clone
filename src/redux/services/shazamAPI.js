import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//   method: "GET",
//   url: "https://shazam.p.rapidapi.com/charts/list",
//   headers: {
//     "X-RapidAPI-Key": "b48d6ede2bmsh622cbd062df4675p1e9604jsncb13b08d9d5d",
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

export const shazamAPI = createApi({
  reducerPath: "shazamAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "b48d6ede2bmsh622cbd062df4675p1e9604jsncb13b08d9d5d"
      );
      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCharts: builder.query({ query: () => "/charts/track" }),
  }),
});
export const { useGetChartsQuery } = shazamAPI;
