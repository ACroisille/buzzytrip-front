import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SimpleChoice from "../choice/SimpleChoice";

function Participant({ name }) {
   return (
      <Card>
         <CardContent>
            <Typography variant="h5">{name}</Typography>
         </CardContent>
      </Card>
   );
}

SimpleChoice.propTypes = {
   name: PropTypes.string,
};

export default Participant;
