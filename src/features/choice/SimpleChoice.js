import React from "react";

import {
   Card,
   CardContent,
   CardHeader,
   IconButton,
   Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteChoiceMutation } from "./choiceApiSlice";
import VoteButtons from "../vote/VoteButtons";

function SimpleChoice({ choiceId, participantId, name, description }) {
   const [deleteChoice] = useDeleteChoiceMutation();

   return (
      <Card sx={{ width: "inherit" }}>
         <CardHeader
            title={name}
            action={
               <div>
                  <IconButton aria-label="edit">
                     <EditIcon />
                  </IconButton>
                  <IconButton
                     aria-label="delete"
                     onClick={() => deleteChoice({ id: choiceId })}
                  >
                     <DeleteIcon />
                  </IconButton>
               </div>
            }
         />
         <CardContent>
            <Typography variant="body2" color="text.secondary">
               {description}
            </Typography>
         </CardContent>
         <VoteButtons choiceId={choiceId} participantId={participantId} />
      </Card>
   );
}

export default SimpleChoice;
