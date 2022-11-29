import { Outlet, Navigate } from "react-router-dom";

// import checkUserSignedIn from "./checkUserSignedIn";
import { AuthState } from "../context/AuthProvider";

const PrivateRoutes = () => {
  const { auth } = AuthState();
  // (auth !== null && new Date() < new Date(auth.expires_at))

  // If "auth" !== null access private routes else navigate to login
  return (auth !== null && new Date() < new Date(auth.expires_at)) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
