import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Row } from "antd";

import {
  UserOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { useAppSelector } from "../store";
import { Link } from "react-router-dom";
import { MainLayout } from "./MainLayout";

const menuItems = [
  {
    key: "calendar",
    icon: <CalendarOutlined />,
    label: <Link to="calendar">Календарь</Link>,
  },
  {
    key: "client",
    icon: <UserOutlined />,
    label: <Link to="clients">Клиенты</Link>,
  },
  {
    key: "trainer",
    icon: <UserOutlined />,
    label: <Link to="sd">Инструктора</Link>,
  },
  {
    key: "trainings",
    icon: <UnorderedListOutlined />,
    label: <Link to="sd">Тренировки</Link>,
  },
];

export const AdminLayout = () => {
  const { username } = useAppSelector((state) => state.user);

  return (
    <MainLayout>
      <Layout.Sider style={{ backgroundColor: "#fff" }}>
        <Menu
          selectable={false}
          theme="light"
          mode="vertical"
          items={menuItems}
        ></Menu>
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </MainLayout>
  );
};
