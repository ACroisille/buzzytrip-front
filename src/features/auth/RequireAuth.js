import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const RequireAuth = () => {
   const location = useLocation();
   const currentUser = useSelector(selectCurrentUser);

   if (currentUser) {
      return <Outlet />;
   } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }
};
export default RequireAuth;
