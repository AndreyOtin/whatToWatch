import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getToken, setToken } from './token';
import { Film } from '../types/film';
import { Comment, NewComment } from '../types/comment';
import { AuthUser, NewUser } from '../types/user';
import { redirectBack } from '../store/middlewares/actions';

const BASE_URL = 'https://12.react.pages.academy/wtw';
const TIMEOUT = 5000;

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
  tagTypes: ['Films', 'Comments', 'User', 'Favorite'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();

      token && headers.set('X-Token', token);

      return headers;
    },
    fetchFn: async (
      input: RequestInfo,
      init?: RequestInit) => {
      const controller = new AbortController();

      const timerId = setTimeout(() => {
        controller.abort();
      }, TIMEOUT);

      try {
        return await fetch(input, { ...init, signal: controller.signal });
      } finally {
        clearTimeout(timerId);
      }
    }
  }),
  endpoints: (builder) => ({
    getFilm: builder.query<Film, string>({
      query: (id) => `${APIRoute.Films}/${id}`,
      providesTags: (result, error, arg) => error ? [] : [{ type: 'Films', id: arg }]
    }),
    getSimilar: builder.query<Film[], string>({
      query: (id) => `${APIRoute.Films}/${id}/similar`
    }),
    getFavorites: builder.query<Film[], void>({
      query: () => APIRoute.Favorites,
      providesTags: ['Favorite']
    }),
    initMainScreen: builder.query<{ promoFilm: Film; films: Film[] }, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const result = await Promise.all([
          baseQuery(APIRoute.Promo),
          baseQuery(APIRoute.Films)
        ]);

        return result[0].data && result[1].data
          ? { data: { films: result[1].data as Film[], promoFilm: result[0].data as Film } }
          : { error: result[0].error as FetchBaseQueryError };
      },
      providesTags: (result, error) => {
        if (error || !result?.films || !result?.promoFilm) {
          return [];
        }
        const res = result.films.map(({ id }) => ({ id, type: 'Films' as const }));
        return [{ type: 'Films', id: result.promoFilm.id }, ...res];
      }
    }),
    checkAuth: builder.query<AuthUser, void>({
      query: () => APIRoute.Login,
      providesTags: ['User']
    }),
    getComments: builder.query<Comment[], number>({
      query: (id) => `${APIRoute.Comments}/${id}`,
      providesTags: ['Comments']
    }),
    changeFavorite: builder.mutation<Film, { id: number; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        method: 'POST',
        url: `${APIRoute.Favorites}/${id}/${Number(isFavorite)}`
      }),
      invalidatesTags: (result, error) => error ? [] : ['Favorite', 'Films']
    }),
    authenticateUser: builder.mutation<AuthUser, NewUser>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const response = await baseQuery({
          method: 'POST',
          url: APIRoute.Login,
          body: arg
        });

        if (response.error) {
          return { error: response.error };
        }

        const data = response.data as AuthUser;
        setToken(data.token);
        api.dispatch(redirectBack());

        return { data };
      },
      invalidatesTags: ['User']
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
      invalidatesTags: (result, error) => error ? [] : ['User']
    })
  })
});

export const {
  useInitMainScreenQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useAuthenticateUserMutation,
  useChangeFavoriteMutation,
  useCheckAuthQuery,
  useGetFavoritesQuery,
  useGetFilmQuery,
  useGetSimilarQuery,
  useLogUserOutMutation
} = apiSlice;
