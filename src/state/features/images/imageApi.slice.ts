import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getImagesResponse } from '.';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const tagTypesOptions = {
  imagesTag: 'imagesTag',
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://pixabay.com/api/',
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// attach refresh token
const refreshBaseQuery = fetchBaseQuery({
  baseUrl: 'https://pixabay.com/api/',
  prepareHeaders: (headers, { getState }) => {
    // const isLoggedIn = (getState() as RootState).auth.isLoggedIn;
    const isLoggedIn = true;
    // const { refreshToken } = authService.getTokens();
    const { refreshToken } = { refreshToken: 'abs' };
    if (isLoggedIn) headers.set('authorization', `Bearer ${refreshToken}`);
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log('logout user.');
    // api.dispatch(logoutUser());
  }

  if (result?.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // find the user from the state
        // const user = (api.getState() as RootState).auth.user;
        const user = { _id: '123', userId: 'abc' };

        // make a refresh token request.
        const refreshResult = await refreshBaseQuery(
          {
            url: `/auth/refresh-token?userId=${user?._id}&crUserId=${user?.userId}`,
            method: 'POST',
          },
          api,
          extraOptions,
        );

        if (refreshResult?.data) {
          const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken;

          // api.dispatch(setTokens({ accessToken: newAccessToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log('if there is any error the logout the user.');
          // api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const imageApiSlice = createApi({
  reducerPath: 'images',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
  tagTypes: [...Object.keys(tagTypesOptions)],
  endpoints: builder => ({
    getImages: builder.query<getImagesResponse, void>({
      query: () => ({ url: `?key=22490979-1f9ed0f6cf9068fab5840a079&q=&image_type=photos=true` }),
      providesTags: [tagTypesOptions.imagesTag],
    }),
  }),
});

export const { useGetImagesQuery } = imageApiSlice;
