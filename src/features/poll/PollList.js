import React from "react";
import { List, ListItem } from "@mui/material";
import { useGetUserPollsQuery } from "./pollApiSlice";

function PollList({ user_id }) {
   const {
      data: polls,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetUserPollsQuery({ user_id });

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <List>
            {polls.ids.map((pollId) => (
               <ListItem key={pollId}>
                  <h3>{polls.entities[pollId].name}</h3>
               </ListItem>
            ))}
         </List>
      );
   }

   return content;
}

export default PollList;
