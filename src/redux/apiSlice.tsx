import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); 
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/me",
    }),
    getUsers: builder.query({
      query: () => "/users",
    })
  }),
});

export const { useLoginMutation, useGetProfileQuery, useGetUsersQuery } = apiSlice;
