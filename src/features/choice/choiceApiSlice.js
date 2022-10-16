import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const choiceAdapter = createEntityAdapter();
const initialState = choiceAdapter.getInitialState();

export const choiceApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getChoices: builder.query({
         query: () => "choice/",
         transformResponse: (responseData) => {
            return choiceAdapter.setAll(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Choice", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Choice", id })),
         ],
      }),
      addChoice: builder.mutation({
         query: (choice) => ({
            url: "choice/",
            method: "POST",
            body: choice,
         }),
         invalidatesTags: [{ type: "Choice", id: "LIST" }],
      }),
      deleteChoice: builder.mutation({
         query: ({ id }) => ({
            url: `/choice/${id}`,
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
   useGetChoicesQuery,
   useAddChoiceMutation,
   useDeleteChoiceMutation,
} = choiceApiSlice;
