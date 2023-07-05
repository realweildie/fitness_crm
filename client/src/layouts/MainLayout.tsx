import React from "react";
import { Layout, Menu, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useAppSelector } from "../store";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { username } = useAppSelector((state) => state.user);

  const menuItems = [
    {
      key: "username",
      icon: <UserOutlined />,
      label: username,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header style={{ backgroundColor: "#fff" }}>
        <Row justify="end">
          <Menu
            selectable={false}
            theme="light"
            mode="horizontal"
            items={menuItems}
          ></Menu>
        </Row>
      </Layout.Header>
      <Layout>{children}</Layout>
    </Layout>
  );
};
