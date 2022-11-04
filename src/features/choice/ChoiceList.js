import React from "react";
import SimpleChoice from "./SimpleChoice";
import { useGetPollChoicesQuery } from "./choiceApiSlice";
import PropTypes from "prop-types";

function ChoiceList({ pollId, participantId }) {
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
                  <SimpleChoice
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
}

ChoiceList.proptypes = {
   pollId: PropTypes.number,
   participantId: PropTypes.number,
};

export default ChoiceList;
