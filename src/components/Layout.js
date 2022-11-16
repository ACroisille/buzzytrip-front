import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUserId } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

/**
 * Layout componnent
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = () => {
   const dispatch = useDispatch();
   try {
      // Get refresh token from localstorage
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
         const userId = jwt_decode(refresh).user_id;
         // Dispatch userId to Auth store
         dispatch(setUserId({ userId }));
      }
      return <Outlet />;
   } catch (err) {
      // If refresh token is not available
      return <Outlet />;
   }
};

export default Layout;
