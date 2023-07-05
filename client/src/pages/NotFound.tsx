import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Row justify="center" align="middle" className="h100">
      <Col style={{ textAlign: "center" }}>
        <h1>404</h1>
        <Link to="/login">Войти в систему</Link>
      </Col>
    </Row>
  );
};
