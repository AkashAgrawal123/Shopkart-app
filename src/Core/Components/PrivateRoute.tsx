import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import "../Styles/PrivateRoute.scss";

const PrivateRoute: FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="private-route">
        <Outlet />
      </div>
    </>
  );
};

export default PrivateRoute;
