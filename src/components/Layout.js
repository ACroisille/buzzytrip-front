import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUserId } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
   const dispatch = useDispatch();
   try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
         const userId = jwt_decode(refresh).user_id;
         dispatch(setUserId({ userId }));
      }
      return <Outlet />;
   } catch (err) {
      return <Outlet />;
   }
};

export default Layout;
