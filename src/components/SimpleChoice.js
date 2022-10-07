import React from "react";
import PropTypes from "prop-types";
import {
   Card,
   CardActions,
   CardContent,
   CardHeader,
   IconButton,
   Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteChoiceMutation } from "../features/choices";

function SimpleChoice({ id, title, description }) {
   const [deleteChoice] = useDeleteChoiceMutation();
   return (
      <Card sx={{ width: "inherit" }}>
         <CardHeader
            title={title}
            action={
               <div>
                  <IconButton aria-label="edit">
                     <EditIcon />
                  </IconButton>
                  <IconButton
                     aria-label="delete"
                     onClick={() => deleteChoice({ id: id })}
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
         <CardActions>
            <IconButton aria-label="Vote for it">
               <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="Vote against it">
               <ThumbDownIcon />
            </IconButton>
         </CardActions>
      </Card>
   );
}

SimpleChoice.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
};

export default SimpleChoice;
