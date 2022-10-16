import React from "react";
import { Grid, Stack } from "@mui/material";
import ChoiceList from "../features/choice/ChoiceList";
import ChoiceDialog from "../features/choice/ChoiceDialog";

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
