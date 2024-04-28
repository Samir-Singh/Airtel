import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoutes = ({ redirectTo }) => {
  const auth = JSON.parse(
    secureLocalStorage?.getItem("loginResponse")
  )?.bearerToken;

  if (auth) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoutes;
