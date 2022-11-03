import React from "react";
import PropTypes from "prop-types";

import { useGetUserPollsQuery } from "../poll/pollApiSlice";
import PollCard from "./PollCard";

const PollList = ({ userId }) => {
   const {
      data: polls,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetUserPollsQuery({ userId });

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <div className="pt-4 w-full">
            <ul>
               {polls.ids.map((pollId) => (
                  <li key={pollId}>
                     <PollCard
                        pollId={pollId}
                        name={polls.entities[pollId].name}
                     />
                  </li>
               ))}
            </ul>
         </div>
      );
   }

   return content;
};

PollList.propTypes = {
   userId: PropTypes.number,
};

export default PollList;
