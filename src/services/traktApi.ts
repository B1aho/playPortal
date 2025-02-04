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
      headers.set('Content-type', 'application/json');
      headers.set('trakt-api-key', CLIENT_ID);
      headers.set('trakt-api-version', '2');

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: ({ page, tmdbRatingMin, tmdbRatingMax }: { page: number, tmdbRatingMin: number, tmdbRatingMax: number }) => ({
        url: 'movies/popular',
        params: { page: page.toString(), ratings: tmdbRatingMin.toString() + '-' + tmdbRatingMax.toString() },
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
    getMovieInfoShort: builder.query<Movie, string | undefined>({
      query: (id) => ({
        url: `movies/${id}`,
      }),
      transformResponse: (movie: Movie): Movie => {
        return addTypeToTheMovie(movie);
      },
    }),
    getShowInfoShort: builder.query<Movie, string | undefined>({
      query: (id) => ({
        url: `shows/${id}`,
      }),
      transformResponse: (movie: Movie): Movie => {
        return addTypeToTheShow(movie);
      },
    }),
    getMovieRelated: builder.query<Movie[], string | undefined>({
      query: (id) => ({
        url: `movies/${id}/related?page=1&limit=5`,
      }),
      transformResponse: addTypeToTheMovies,
    }),
    getShowRelated: builder.query<Movie[], string | undefined>({
      query: (id) => ({
        url: `shows/${id}/related?page=1&limit=5`,
        page: '1',
        limit: '5',
      }),
      transformResponse: addTypeToTheShows,
    }),
    searchMovies: builder.query({
      query: ({ query, searchType, page, tmdbRatingMin, tmdbRatingMax }) => {
        const params = new URLSearchParams({
          query: query,
          ratings: tmdbRatingMin.toString() + '-' + tmdbRatingMax.toString(),
          page: page.toString(),
        });
        if (!query)
          params.set('query', " ");
        console.log(`search/${searchType}?${params.toString()}&fields=title,overview`)
        return `search/${searchType}?${params.toString()}&fields=title,overview`
      },
      transformResponse: (response: SearchResponse[]): (Movie | null)[] => {
        return getMoviesArray(response);
      },
    }),
    searchMoviesAutocomplete: builder.query({
      query: ({ query, option, genre }) => {
        const params = new URLSearchParams({
          query: query,
          page: '1',
          limit: '5',
        });
        if (!query)
          params.set('query', " ");
        if (genre)
          params.append('genres', genre);
        return `search/${option}?${params.toString()}&fields=title`
      },
      transformResponse: (response: SearchResponse[]): (Movie | null)[] => {
        return getMoviesArray(response);
      },
    }),
    getMedia: builder.query({
      query: ({ page, query, genre, searchType, tmdbRatingMin, tmdbRatingMax }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          query: query || '',
          ratings: tmdbRatingMin.toString() + '-' + tmdbRatingMax.toString(),
        });

        if (genre) {
          params.append('genres', genre);
        }

        return `search/${searchType}?${params.toString()}`;
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
  useLazyGetMovieInfoShortQuery,
  useLazyGetShowInfoShortQuery,
  useSearchMoviesAutocompleteQuery,
  useGetMediaQuery,
  useGetMovieRelatedQuery,
  useGetShowRelatedQuery,
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

function addTypeToTheShows(movies: Movie[]): Movie[] {
  return movies.map(item => {
    const movie: Movie = item;
    movie.type = 'tv'
    return movie;
  });
}

function addTypeToTheMovie(movie: Movie): Movie {
  movie.type = 'movie'
  return movie;
}

function addTypeToTheShow(movie: Movie): Movie {
  movie.type = 'tv'
  return movie;
}