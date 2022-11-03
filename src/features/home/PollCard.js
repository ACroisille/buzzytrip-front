import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PollCard = ({ pollId, name }) => {
   return (
      <Link
         className="block rounded shadow-md py-3 px-2 bg-violet-100 hover:bg-violet-200"
         to={`/poll/${pollId}`}
      >
         {name}
      </Link>
   );
};

PollCard.propTypes = {
   pollId: PropTypes.number,
   name: PropTypes.string,
};

export default PollCard;
