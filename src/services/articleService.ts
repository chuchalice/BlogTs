import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  IArticlesResponse,
  IExtendArticleResponse,
  ITagInterface,
} from "../interfaces/article";
import { IFetchAllArticlesInterface } from "../interfaces/article";

export const articleAPI = createApi({
  reducerPath: "articleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api",
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<
      IArticlesResponse,
      IFetchAllArticlesInterface
    >({
      query: ({ offset }) => ({
        url: "/articles",
        params: {
          offset,
          limit: 5,
        },
        headers: { Authorization: `Token ${localStorage.token}` },
      }),
    }),
    FetchOneArticle: build.query<IExtendArticleResponse, string>({
      query: (path) => ({
        url: `/articles/${path}`,
        headers: { Authorization: `Token ${localStorage.token}` },
      }),
    }),
    userRegistration: build.mutation({
      query: ({ username, password, email }) => ({
        url: "/users",
        method: "POST",
        body: {
          user: { username, email, password },
        },
      }),
    }),
    userAuthorization: build.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: {
          user: { email, password },
        },
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: "/user",
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      }),
    }),
    postArticle: build.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: "/articles",
        method: "POST",
        body: {
          article: {
            title,
            description,
            body,
            tagList: tagList.map((el: ITagInterface) => el.tagName),
          },
        },
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      }),
    }),
    userUpdate: build.mutation({
      query: ({ body }) => ({
        url: "/user",
        headers: { Authorization: `Token ${localStorage.token}` },
        method: "PUT",
        body: {
          user: body,
        },
      }),
    }),
    favoritePost: build.mutation({
      query: ({ slug, value }) => ({
        url: `/articles/${slug}/favorite`,
        method: value ? "DELETE" : "POST",
        headers: { Authorization: `Token ${localStorage.token}` },
      }),
    }),
    updateArticle: build.mutation({
      query: ({ title, description, body, tagList, id }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body: {
          article: {
            title,
            description,
            body,
            tagList: tagList.map((el: ITagInterface) => el.tagName),
          },
        },
        headers: { Authorization: `Token ${localStorage.token}` },
      }),
    }),
    deleteArticle: build.mutation({
      query: ({ id }) => ({
        url: `/articles/${id}`,
        method: "DELETE",
        headers: { Authorization: `Token ${localStorage.token}` },
      }),
    }),
  }),
});
