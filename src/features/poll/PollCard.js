import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PollCard = ({ pollId, name }) => {
   return (
      <div className="flex bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <Link className="grow" to={`/poll/${pollId}`}>
            {name}
         </Link>
      </div>
   );
};

PollCard.propTypes = {
   pollId: PropTypes.string,
   name: PropTypes.string,
};

export default PollCard;
