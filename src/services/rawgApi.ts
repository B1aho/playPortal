import { GameCardInfo, GameDetailResponse, GameResults, GamesResponse, Movie, MovieResponse, Screenshot, ScreenshotsResponse } from '@/services/rawgTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Обработать ошибки если их сервер лёг!
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
    getGameShortDetaileById: builder.query({
      query: (id) => `games/${id}?key=${API_KEY}`,
      transformResponse: (response: GameDetailResponse) => ({
        gameCardData: getShortDetail(response),
      }),
    }),
    getGames: builder.query({
      query: ({ page, search, genre, tag, platform, developer }) => {
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

        if (platform) {
          params.append('platforms', platform);
          params.delete('search');
        }

        if (developer) {
          params.append('developers', developer);
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

export const {
  useGetGameDetaileByIdQuery,
  useGetGamesQuery,
  useGetMediaByIdQuery,
  useGetMoviesByIdQuery,
  useLazyGetGameShortDetaileByIdQuery,
} = rawgApi

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

function getShortDetail(detail: GameDetailResponse): GameCardInfo {
  return {
    id: detail.id,
    name: detail.name,
    background_image: detail.background_image,
    metacritic: detail.metacritic,
    rating: detail.rating,
    released: detail.released,
    slug: detail.slug,
  }
}