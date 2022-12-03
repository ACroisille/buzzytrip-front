import { useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Paginator = ({ currentPage, totalPageCount, setPage }) => {
   const dispatch = useDispatch();

   const previous = () => {
      if (currentPage > 1) {
         dispatch(setPage({ currentPage: currentPage - 1 }));
      }
   };
   const next = () => {
      if (currentPage < totalPageCount) {
         dispatch(setPage({ currentPage: currentPage + 1 }));
      }
   };
   return (
      <div className={"flex items-center justify-center mt-4"}>
         <button
            className={"border border-gray-300 rounded-l-lg"}
            onClick={previous}
         >
            <ChevronLeftIcon className={"h-6 w-6"} />
         </button>
         <p className={"mx-2"}>
            {currentPage} / {totalPageCount}
         </p>
         <button
            className={"border border-gray-300 rounded-r-lg"}
            onClick={next}
         >
            <ChevronRightIcon className={"h-6 w-6"} />
         </button>
      </div>
   );
};

export default Paginator;
