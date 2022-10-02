import { createSlice } from "@reduxjs/toolkit";
import {
   PENDING,
   REJECTED,
   RESOLVED,
   UPDATING,
   VOID,
} from "../utils/constants";

const initialState = {
   status: "void",
   data: null,
   error: null,
};

export const selectChoices = (state) => state.choices;

export async function fetchChoices(dispatch, getState) {
   const status = selectChoices(getState()).status;
   // If status is pending or updating, stop fetching
   if (status === PENDING || status === UPDATING) {
      return;
   }
   dispatch(actions.fetching());
   try {
      // on utilise fetch pour faire la requête
      const response = await fetch("http://localhost:8000/api/choice/");
      const data = await response.json();
      dispatch(actions.resolved(data));
   } catch (error) {
      dispatch(actions.rejected(error));
   }
}

const { actions, reducer } = createSlice({
   name: "choices",
   initialState,
   reducers: {
      fetching: (draft) => {
         switch (draft.status) {
            case VOID:
               draft.status = PENDING;
               break;
            case REJECTED:
               draft.error = null;
               draft.status = PENDING;
               break;
            case RESOLVED:
               draft.status = UPDATING;
               break;
            default:
               break;
         }
      },
      resolved: (draft, action) => {
         switch (draft.status) {
            case PENDING:
            case UPDATING:
               draft.data = action.payload;
               draft.status = RESOLVED;
               break;
            default:
               break;
         }
      },
      rejected: (draft, action) => {
         switch (draft.status) {
            case PENDING:
            case UPDATING:
               draft.status = REJECTED;
               draft.error = action.payload;
               draft.data = null;
               break;
            default:
               break;
         }
      },
   },
});

export default reducer;
