import React from "react";
import { List, ListItem } from "@mui/material";
import SimpleChoice from "./SimpleChoice";
import { useGetPollChoicesQuery } from "./choiceApiSlice";

function ChoiceList({ poll_id }) {
   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollChoicesQuery({ poll_id });

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <List>
            {choices.ids.map((choiceId) => (
               <ListItem key={choiceId}>
                  <SimpleChoice
                     id={choiceId}
                     title={choices.entities[choiceId].name}
                     description={choices.entities[choiceId].description}
                  />
               </ListItem>
            ))}
         </List>
      );
   }

   return content;
}

export default ChoiceList;
