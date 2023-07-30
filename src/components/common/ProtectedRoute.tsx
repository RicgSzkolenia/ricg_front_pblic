import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

const ProtectedRoute = () => {
  const isAuthenticated:boolean = useSelector((state:AppState) => state.user.isAuthenticated);
  
  return(
    isAuthenticated ? <Outlet/> : <Navigate to='/login'></Navigate>
  );
}

export default ProtectedRoute;