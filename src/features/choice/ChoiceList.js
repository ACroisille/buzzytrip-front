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
         <ul className="w-full">
            {choices.ids.map((choiceId) => (
               <li key={choiceId}>
                  <ChoiceCard
                     choiceId={choiceId}
                     participantId={participantId}
                     name={choices.entities[choiceId].name}
                     description={choices.entities[choiceId].description}
                  />
               </li>
            ))}
         </ul>
      );
   }

   return content;
};

ChoiceList.propTypes = {
   pollId: PropTypes.string,
   participantId: PropTypes.number,
};

export default ChoiceList;
