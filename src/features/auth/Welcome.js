import jwt_decode from "jwt-decode";

import { useGetUserQuery } from "../user/userApiSlice";
import PollList from "../poll/PollList";

const Welcome = () => {
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   const { data: user } = useGetUserQuery({ id: decoded?.user_id });

   const welcome = user
      ? `Welcome ${user.entities[decoded?.user_id].username}!`
      : "Welcome!";

   return (
      <section className="welcome">
         <h1>{welcome}</h1>
         <PollList userId={decoded?.user_id} />
      </section>
   );
};
export default Welcome;
