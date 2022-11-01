import React from "react";
import { Link } from "react-router-dom";

import { List, ListItem } from "@mui/material";

import { useGetUserPollsQuery } from "./pollApiSlice";

function PollList({ userId }) {
   const {
      data: polls,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetUserPollsQuery({ userId });

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
                  <Link to={`/poll/${pollId}`}>
                     {polls.entities[pollId].name}
                  </Link>
               </ListItem>
            ))}
         </List>
      );
   }

   return content;
}

export default PollList;
