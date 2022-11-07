import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeletePollMutation } from "./pollApiSlice";

const PollCard = ({ pollId, name }) => {
   const [deletePoll] = useDeletePollMutation();

   return (
      <div className="flex bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <Link className="grow" to={`/poll/${pollId}`}>
            {name}
         </Link>
         <button onClick={() => deletePoll({ id: pollId })}>
            <TrashIcon className="h-6 w-6" />
         </button>
      </div>
   );
};

PollCard.propTypes = {
   pollId: PropTypes.string,
   name: PropTypes.string,
};

export default PollCard;
