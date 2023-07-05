import React from "react";
import { Outlet } from "react-router-dom";
import { MainLayout } from "./MainLayout";

export const ClientLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
