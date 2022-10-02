import React from "react";
import { Grid, Stack } from "@mui/material";
import ChoiceList from "../components/ChoiceList";

function Poll() {
   return (
      <Stack>
         <Grid container>
            <Grid item xs={10}>
               <ChoiceList />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
