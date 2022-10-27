import React from "react";
import { Grid, Stack } from "@mui/material";
import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import { useParams } from "react-router-dom";

function Poll() {
   const { poll_id } = useParams();
   console.log(poll_id);

   return (
      <Stack>
         <ChoiceDialog />
         <Grid container>
            <Grid item xs={10}>
               <ChoiceList poll_id={poll_id} />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
