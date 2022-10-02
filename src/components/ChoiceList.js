import React, { useEffect } from "react";
import { List, ListItem } from "@mui/material";
import SimpleChoice from "./SimpleChoice";
import { useDispatch, useSelector } from "react-redux";
import { fetchChoices, selectChoices } from "../features/choices";
import { PENDING, REJECTED, VOID } from "../utils/constants";

function ChoiceList() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchChoices);
   }, [dispatch]);

   const choices = useSelector(selectChoices);

   if (choices.status === REJECTED) {
      return <span>Il y a un problème</span>;
   }

   return (
      <div>
         {choices.status === PENDING || choices.status === VOID ? (
            <span>Loading choices</span>
         ) : (
            <List>
               {choices.data.map((choice) => (
                  <ListItem key={choice.id}>
                     <SimpleChoice
                        title={choice.name}
                        description={choice.description}
                     />
                  </ListItem>
               ))}
            </List>
         )}
      </div>
   );
}

export default ChoiceList;
