import React from "react";
import PropTypes from "prop-types";

import ChoiceCard from "../choice/ChoiceCard";

/**
 * Component that displays participant main data
 * @param name
 * @returns {JSX.Element}
 * @constructor
 */
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
