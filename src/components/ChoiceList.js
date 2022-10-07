import React from "react";
import { List, ListItem } from "@mui/material";
import SimpleChoice from "./SimpleChoice";
import { useGetChoicesQuery } from "../features/choices";

function ChoiceList() {
   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetChoicesQuery();

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
