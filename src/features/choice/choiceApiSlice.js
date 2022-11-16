import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const choiceAdapter = createEntityAdapter();
const initialState = choiceAdapter.getInitialState();

/**
 * Choice related endpoints
 */
export const choiceApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPollChoices: builder.query({
         query: ({ pollId }) => `/choice/?poll_id=${pollId}`,
         transformResponse: (responseData) => {
            return choiceAdapter.setAll(initialState, responseData);
         },
         providesTags: (result) => [
            { type: "Choice", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Choice", id })),
         ],
      }),
      getChoice: builder.query({
         query: ({ choiceId }) => `/choice/${choiceId}/`,
         transformResponse: (responseData) => {
            return choiceAdapter.setOne(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Choice", id: arg.choiceID },
         ],
      }),
      addChoice: builder.mutation({
         query: (choice) => ({
            url: "/choice/",
            method: "POST",
            body: choice,
         }),
         invalidatesTags: [{ type: "Choice", id: "LIST" }],
      }),
      updateChoice: builder.mutation({
         query: ({ id, ...choice }) => ({
            url: `/choice/${id}/`,
            method: "PATCH",
            body: choice,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Choice", id: arg.id },
         ],
      }),
      deleteChoice: builder.mutation({
         query: ({ id }) => ({
            url: `/choice/${id}/`,
            method: "DELETE",
            body: { id },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Choice", id: arg.id },
         ],
      }),
   }),
});

export const {
   useGetPollChoicesQuery,
   useAddChoiceMutation,
   useUpdateChoiceMutation,
   useDeleteChoiceMutation,
} = choiceApiSlice;
