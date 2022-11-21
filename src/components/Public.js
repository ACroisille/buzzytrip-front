/**
 * Public component
 * @returns {JSX.Element}
 * @constructor
 */
const Public = () => {
   return (
      <section className="public">
         <div className={"flex flex-row"}>
            <div className={"flex w-full"}>
               <div className={"w-1/2 bg-blue-500 p-80"}>
                  <h1>Planify your group trips with no stress</h1>
                  <p>
                     BuzzyTrip helps you to sync with your friends to pick the
                     right rental for your holidays before it's too late.
                  </p>
               </div>
               <div className={"w-1/2 bg-pink-500"}>
                  <p>Picture</p>
               </div>
            </div>
         </div>
      </section>
   );
};
export default Public;
