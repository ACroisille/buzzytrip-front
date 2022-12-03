import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { setCurrentPage } from "../participant/participantSlice";

const choiceAdapter = createEntityAdapter();
const initialState = choiceAdapter.getInitialState();

/**
 * Choice related endpoints
 */
export const choiceApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPollChoices: builder.query({
         query: ({ pollId, page = 1 }) =>
            `/choice/?poll_id=${pollId}&page=${page}`,
         transformResponse: (response, meta, arg) => {
            const entities = choiceAdapter.setAll(
               initialState,
               response.results
            );
            return {
               currentPage: arg.page,
               totalChoiceCount: response.count,
               previousPage: response.previous,
               nextPage: response.next,
               ...entities,
            };
         },
         providesTags: (result) => [
            { type: "Choice", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Choice", id })),
            { type: "ChoicePage", id: result.currentPage },
         ],
      }),
      getChoice: builder.query({
         query: ({ choiceId }) => `/choice/${choiceId}/`,
         transformResponse: (response) => {
            return choiceAdapter.setOne(initialState, response);
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
         async onQueryStarted(
            { id, pollId, currentPage, index },
            { dispatch, queryFulfilled }
         ) {
            // Delete choice from cache
            const patchResult = dispatch(
               apiSlice.util.updateQueryData(
                  "getPollChoices",
                  { pollId: pollId, page: currentPage },
                  (draft) => {
                     draft.totalChoiceCount = draft.totalChoiceCount - 1;
                     if (draft.entities[id]) {
                        draft.ids.splice(
                           draft.ids.findIndex((x) => x === id),
                           1
                        );
                        delete draft.entities[id];
                     }
                  }
               )
            );
            try {
               await queryFulfilled;
               if (currentPage > 1 && index === 0) {
                  // If deleted choice is the last of its page, go to previous page
                  dispatch(setCurrentPage({ currentPage: currentPage - 1 }));
               } else {
                  // Invalidate current page
                  dispatch(
                     apiSlice.util.invalidateTags([
                        {
                           type: "ChoicePage",
                           id: currentPage,
                        },
                     ])
                  );
               }
            } catch {
               patchResult.undo();
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: "Participant", id: "VOTE_COUNT" },
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
