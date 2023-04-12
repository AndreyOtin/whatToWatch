import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from './token';
import { Film } from '../types/film';
import { Comment, NewComment } from '../types/comment';
import { AuthUser, NewUser } from '../types/user';

const BASE_URL = 'https://12.react.pages.academy/wtw';

enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = 'logout'
}

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Films', 'Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();

      token && headers.set('X-Token', token);

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getFilms: builder.query<Film[], void>({
      query: () => APIRoute.Films,
      providesTags: []
    }),
    getFilm: builder.query<Film, number>({
      query: (id) => `${APIRoute.Films}/${id}`,
      providesTags: []
    }),
    getSimilar: builder.query<Film[], number>({
      query: (id) => `${APIRoute.Films}/${id}/similar`,
      providesTags: []
    }),
    getPromo: builder.query<Film, void>({
      query: () => APIRoute.Promo,
      providesTags: []
    }),
    getFavorites: builder.query<Film[], void>({
      query: () => APIRoute.Promo,
      providesTags: []
    }),
    checkAuth: builder.query<AuthUser, void>({
      query: () => APIRoute.Login,
      providesTags: []
    }),
    getComments: builder.query<Comment, number>({
      query: (id) => `${APIRoute.Comments}/${id}`,
      providesTags: []
    }),
    changeFavorite: builder.mutation<Film, { id: number; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        method: 'POST',
        url: `${APIRoute.Favorites}/${id}/${Number(isFavorite)}`
      }),
      invalidatesTags: ['Films']
    }),
    authenticateUser: builder.mutation<AuthUser, NewUser>({
      query: (newUser) => ({
        method: 'POST',
        url: APIRoute.Login,
        body: newUser
      }),
      invalidatesTags: []
    }),
    addComment: builder.mutation<Comment, NewComment>({
      query: ({ id, ...rest }) => ({
        url: `${APIRoute.Comments}/${id}`,
        method: 'POST',
        body: rest
      }),
      invalidatesTags: ['Comments']
    }),
    logUserOut: builder.mutation<void, void>({
      query: () => ({
        url: APIRoute.Logout,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comments']
    })
  })
});

export const {
  useGetFilmsQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useAuthenticateUserMutation,
  useChangeFavoriteMutation,
  useCheckAuthQuery,
  useGetFavoritesQuery,
  useGetFilmQuery,
  useGetPromoQuery,
  useGetSimilarQuery,
  useLogUserOutMutation
} = apiSlice;
