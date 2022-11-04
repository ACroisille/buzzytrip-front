import React from "react";
import PropTypes from "prop-types";

import ChoiceCard from "../choice/ChoiceCard";

function ParticipantCard({ name }) {
   return (
      <div className="rounded shadow-md py-1 px-2 bg-violet-100">
         <p>{name}</p>
      </div>
   );
}

ChoiceCard.propTypes = {
   name: PropTypes.string,
};

export default ParticipantCard;
