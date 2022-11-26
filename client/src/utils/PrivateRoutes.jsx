import { Outlet, Navigate } from "react-router-dom";

import checkUserSignedIn from "./checkUserSignedIn";

const PrivateRoutes = () => {
  return checkUserSignedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
