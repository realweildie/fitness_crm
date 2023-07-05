import { ClientHome } from "../pages/ClientHome";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { AdminCalendar } from "../pages/AdminCalendar";
import { AdminClientTable } from "../pages/AdminClientTable";

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: "*", component: NotFound },
  { path: "/login", component: Login },
];

export const clientRoutes: IRoute[] = [
  { path: "calendar", component: ClientHome },
];

export const adminRoutes: IRoute[] = [
  { path: "calendar", component: AdminCalendar },
  { path: "clients", component: AdminClientTable },
];
