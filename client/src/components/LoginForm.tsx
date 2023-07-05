import { Form, Input, Button } from "antd";
import React from "react";
import { IUser } from "../models/IUser";
import { doLogin } from "../store/user.slice";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (form: IUser) => {
    const res = await dispatch(doLogin(form));

    // TODO: make navigation for diffrent types of users
    console.log(res);
    navigate("/admin/calendar");
  };

  return (
    <Form
      layout="vertical"
      style={{ minWidth: 320 }}
      onFinish={onFinish}
      initialValues={{ phoneNumber: "79527900029", password: "2wtvxdte" }}
    >
      <Form.Item
        label="Номер телефона"
        name="phoneNumber"
        rules={[
          { required: true, message: "Пожалуйста введите номер телефона!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
