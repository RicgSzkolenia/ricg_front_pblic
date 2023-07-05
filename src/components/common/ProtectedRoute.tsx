import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

interface ProtectedRouteProps {
  allowedRoles:Array<any>
}

const ProtectedRoute = ({ allowedRoles } : ProtectedRouteProps) => {
  const isAuthenticated:boolean = useSelector((state:AppState) => state?.user?.isAuthenticated);
  const userRole:boolean = useSelector((state:AppState) => state?.user?.user?.role);

  const isCorrespondingRole:boolean =  allowedRoles.includes(userRole);

  if ( isAuthenticated && isCorrespondingRole ) {
    return ( <Outlet/> )
  } else {
    return (
      <Navigate to='/home' replace></Navigate>
    )
  }
}

export default ProtectedRoute;