import { Card, Layout, Row } from "antd";
import React from "react";
import { LoginForm } from "../components/LoginForm";

export const Login: React.FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Card title="Вход">
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
};
