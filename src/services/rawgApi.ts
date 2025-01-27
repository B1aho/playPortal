import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.rawg.io/api';
const API_KEY = '182fe43f52474285bc2075377d1d2bdc';
const PAGE_SIZE = '10';

export const rawgApi = createApi({
  reducerPath: 'rawgApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getGameDetaileById: builder.query({
      query: (id) => `games/${id}?key=${API_KEY}`,
    }),
    getGamesPage: builder.query({
      query: ({ page, search }) => {
        const params = new URLSearchParams({
          key: API_KEY,
          page: page.toString(),
          page_size: PAGE_SIZE,
          search: search || '', 
        });

        return `games?${params.toString()}`;
      }
    }),
  }),
})

export const { useGetGameDetaileByIdQuery, useGetGamesPageQuery } = rawgApi
