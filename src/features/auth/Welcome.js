import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";

const Welcome = () => {
   const user = useSelector(selectCurrentUser);

   const welcome = user ? `Welcome ${user}!` : "Welcome!";
   return (
      <section className="welcome">
         <h1>{welcome}</h1>
      </section>
   );
};
export default Welcome;
