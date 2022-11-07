import React from "react";
import PropTypes from "prop-types";
import ChoiceCard from "./ChoiceCard";
import { useGetPollChoicesQuery } from "./choiceApiSlice";

const ChoiceList = ({ pollId, participantId }) => {
   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollChoicesQuery({ pollId });

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <div className="w-full">
            <ul className="flex flex-col space-y-3">
               {choices.ids.map((choiceId) => (
                  <li key={choiceId}>
                     <ChoiceCard
                        choiceId={choiceId}
                        participantId={participantId}
                        choice={choices.entities[choiceId]}
                     />
                  </li>
               ))}
            </ul>
         </div>
      );
   }

   return content;
};

ChoiceList.propTypes = {
   pollId: PropTypes.string,
   participantId: PropTypes.number,
};

export default ChoiceList;
