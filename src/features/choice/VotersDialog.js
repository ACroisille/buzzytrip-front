import { useGetVotersQuery } from "../participant/participantApiSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

function VotersDialog({ visible, onClose, choiceId }) {
   const handleOnClose = (e) => {
      if (e.target.id === "votersModal") onClose();
   };

   const {
      data: participants,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetVotersQuery({ choiceId }, { skip: !visible });

   if (!visible) return null;
   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <div
            id="votersModal"
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
            onClick={handleOnClose}
         >
            <div className="bg-white p-2 rounded shadow-md w-1/4">
               <div className="flex items-center justify-between w-full mb-3">
                  <p className="text-lg">List of voters</p>
                  <button onClick={() => onClose()}>
                     <XMarkIcon className="h-6 w-6" />
                  </button>
               </div>
               <div>
                  <ul className="flex flex-col space-y-2">
                     {participants.ids.map((participantId) => (
                        <li key={participantId}>
                           <div className="rounded shadow-md py-1 px-2 bg-violet-100">
                              <p>
                                 {participants.entities[participantId].pseudo}
                              </p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      );
   }
   return content;
}

export default VotersDialog;
