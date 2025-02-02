import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieDetail } from './traktApiTypes';

// Обработать ошибки если их сервер лёг!
const API_URL = 'https://api.trakt.tv/';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;


export const traktApi = createApi({
  reducerPath: 'traktApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Устанавливаем обязательные заголовки
      headers.set('Content-type', 'application/json');
      headers.set('trakt-api-key', CLIENT_ID); // Подставь свой client_id
      headers.set('trakt-api-version', '2');

      // const token = (getState() as RootState).auth.accessToken;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page: number) => ({
        url: 'movies/popular',
        params: { page: page },
      })
    }),
    getMovieInfo: builder.query<MovieDetail, string | undefined>({
      query: (id) => ({
        url: `movies/${id}`,
        params: { extended: 'full' },
      })
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetMovieInfoQuery,
} = traktApi
