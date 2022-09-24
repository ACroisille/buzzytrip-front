import React from "react";
import { List, ListItem } from "@mui/material";
import SimpleChoice from "./SimpleChoice";

function ChoiceList({ choices }) {
   return (
      <List>
         {choices.map((choice) => (
            <ListItem key={choice.id}>
               <SimpleChoice
                  title={choice.title}
                  description={choice.description}
               />
            </ListItem>
         ))}
      </List>
   );
}

export default ChoiceList;
