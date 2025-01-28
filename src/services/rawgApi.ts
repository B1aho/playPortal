import { GameCardInfo, GamesResponse, Results } from '@/rawgTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://api.rawg.io/api/';
const API_KEY = import.meta.env.VITE_API_KEY;
const PAGE_SIZE = '10';

export const rawgApi = createApi({
  reducerPath: 'rawgApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getGameDetaileById: builder.query({
      query: (id) => `games/${id}?key=${API_KEY}`,
    }),
    getGames: builder.query({
      query: ({ page, search }) => {
        const params = new URLSearchParams({
          key: API_KEY,
          page: page.toString(),
          page_size: PAGE_SIZE,
          search: search || '',
        });

        return `games?${params.toString()}`;
      },

      transformResponse: (response: GamesResponse) => ({
        results: response.results,
        gameCardData: getGameCardData(response.results),
      }),
    }),
  }),
})

export const { useGetGameDetaileByIdQuery, useGetGamesQuery } = rawgApi

function getGameCardData(results: Results[]): GameCardInfo[] {
  return results.map(result => {
    return {
      id: result.id,
      slug: result.slug,
      name: result.name,
      background_image: result.background_image,
      short_screenshots: result.short_screenshots,
      released: result.released,
      rating: result.rating,
    }
  });
}