import { GameCardInfo, GameDetailResponse, GameResults, GamesResponse, Movie, MovieResponse, Screenshot, ScreenshotsResponse } from '@/rawgTypes';
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
      transformResponse: (response: GameDetailResponse) => response,
    }),
    getGames: builder.query({
      query: ({ page, search, genre, tag }) => {
        const params = new URLSearchParams({
          key: API_KEY,
          page: page.toString(),
          page_size: PAGE_SIZE,
          search: search || '',
        });

        if (genre) {
          params.append('genres', genre);
          params.delete('search');
        }

        if (tag) {
          params.append('tags', tag);
          params.delete('search');
        }
        return `games?${params.toString()}`;
      },

      transformResponse: (response: GamesResponse) => ({
        results: response.results,
        gameCardData: getGameCardData(response.results),
        count: response.count,
      }),
    }),
    getMediaById: builder.query({
      query: (id) => {
        return `games/${id}/screenshots?key=${API_KEY}`;
      },

      transformResponse: (response: ScreenshotsResponse) => ({
        screenshots: getScreenshots(response.results),
      }),
    }),
    getMoviesById: builder.query({
      query: (id) => {
        return `games/${id}/movies?key=${API_KEY}`;
      },

      transformResponse: (response: MovieResponse) => ({
        movie: getFirstMovie(response.results),
      }),
    }),
  }),
})

export const { useGetGameDetaileByIdQuery, useGetGamesQuery, useGetMediaByIdQuery, useGetMoviesByIdQuery } = rawgApi

function getGameCardData(results: GameResults[]): GameCardInfo[] {
  return results.map(result => {
    return {
      id: result.id,
      slug: result.slug,
      name: result.name,
      background_image: result.background_image,
      short_screenshots: result.short_screenshots,
      released: result.released,
      rating: result.rating,
      metacritic: result.metacritic,
    }
  });
}

function getScreenshots(screenshots: Screenshot[]) {
  return screenshots.map(screen => {
    return {
      id: screen.id,
      image: screen.image,
    };
  })
};

function getFirstMovie(movies: Movie[]) {
  return movies.map(movie => {
    if (movie.data.max)
      return {
        max: movie.data.max,
        preview: movie.preview,
        id: movie.id
      }
  })
}