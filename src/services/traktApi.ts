import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieDetail, SearchResponse } from './traktApiTypes';

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

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page: number) => ({
        url: 'movies/popular',
        params: { page: page },
      }),
      transformResponse: (movies: Movie[]): Movie[] => {
        return addTypeToTheMovies(movies);
      },
    }),
    getMovieInfo: builder.query<MovieDetail, string | undefined>({
      query: (id) => ({
        url: `movies/${id}`,
        params: { extended: 'full' },
      })
    }),
    getShowInfo: builder.query({
      query: (id) => ({
        url: `shows/${id}`,
        params: { extended: 'full' },
      })
    }),
    searchMovies: builder.query({
      query: ({ search, page }) => {
        const params = new URLSearchParams({
          query: search.query,
          page: page.toString(),
        });
        if (!search.query)
          params.set('query', " ");
        console.log(`search/${search.option}?${params.toString()}&fields=title,overview`)
        return `search/${search.option}?${params.toString()}&fields=title,overview`
      },
      transformResponse: (response: SearchResponse[]): (Movie | null)[] => {
        return getMoviesArray(response);
      },
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetMovieInfoQuery,
  useSearchMoviesQuery,
  useGetShowInfoQuery,
} = traktApi


function getMoviesArray(resp: SearchResponse[]): (Movie | null)[] {
  return resp.map(item => {
    const movie: Movie | undefined = item.movie ? item.movie : item.show;
    if (!movie)
      return null;
    if (item.movie)
      movie.type = 'movie'
    else
      movie.type = 'tv'
    return movie;
  });
}

function addTypeToTheMovies(movies: Movie[]): Movie[] {
  return movies.map(item => {
    const movie: Movie = item;
    movie.type = 'movie'
    return movie;
  });
}