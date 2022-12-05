import { useDispatch } from "react-redux";

const Dropdown = ({ options, selectedOption, setSort, setPage }) => {
   const dispatch = useDispatch();
   const handleOnChange = (e) => {
      dispatch(setSort({ currentSort: e.target.value }));
      dispatch(setPage({ currentPage: 1 }));
   };

   return (
      <select
         id="sortingOptions"
         onChange={handleOnChange}
         value={selectedOption}
         className={"my-2 p-1 text-lg border border-gray-400 rounded-lg"}
      >
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
};

export default Dropdown;
