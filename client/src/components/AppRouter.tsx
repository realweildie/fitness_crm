import React from "react";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, clientRoutes, publicRoutes } from "../router";
import { ClientLayout } from "../layouts/ClientLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { useAppSelector } from "../store";

export const AppRouter: React.FC = () => {
  // const auth = true;

  const { isAdmin, token } = useAppSelector((state) => state.user);

  return (
    <Routes>
      {token && (
        <Route path="/client" element={<ClientLayout />}>
          {clientRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.component}
            />
          ))}
        </Route>
      )}

      {isAdmin === true && token && (
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.component}
            />
          ))}
        </Route>
      )}

      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} Component={route.component} />
      ))}
    </Routes>
  );
};
