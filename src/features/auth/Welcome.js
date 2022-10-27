import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { selectCurrentToken } from "./authSlice";
import { useGetUserQuery } from "../user/userApiSlice";

const Welcome = () => {
   const token = useSelector(selectCurrentToken);
   const decoded = token ? jwt_decode(token) : undefined;
   const { data: user } = useGetUserQuery({ id: decoded?.user_id });

   const welcome = user
      ? `Welcome ${user.entities[decoded?.user_id].username}!`
      : "Welcome!";
   return (
      <section className="welcome">
         <h1>{welcome}</h1>
      </section>
   );
};
export default Welcome;
