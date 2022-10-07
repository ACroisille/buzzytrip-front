import React from "react";
import { Grid, Stack } from "@mui/material";
import ChoiceList from "../components/ChoiceList";
import ChoiceDialog from "../components/ChoiceDialog";

function Poll() {
   return (
      <Stack>
         <ChoiceDialog />
         <Grid container>
            <Grid item xs={10}>
               <ChoiceList />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
