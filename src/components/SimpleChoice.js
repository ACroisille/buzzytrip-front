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
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SimpleChoice({ title, description }) {
   return (
      <Card sx={{ width: "inherit" }}>
         <CardHeader
            title={title}
            action={
               <IconButton aria-label="settings">
                  <MoreVertIcon />
               </IconButton>
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
