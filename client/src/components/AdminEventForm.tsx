import React from "react";
import { Dayjs } from "dayjs";
import { Form, Input, Select, DatePicker } from "antd";
import type { SelectProps } from "antd";

export const AdminEventForm: React.FC<{ date: Dayjs }> = ({ date }) => {
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue({
      date,
      time: null,
    });
  }, [date]);

  const options: SelectProps["options"] = [];

  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form form={form} layout="vertical" style={{ minWidth: 320 }}>
      <Form.Item label="Дата" name="date" rules={[{ required: true }]}>
        <DatePicker disabled />
      </Form.Item>

      <Form.Item
        label="Время"
        name="time"
        rules={[{ required: true, message: "Введите время" }]}
      >
        <Input type="time" />
      </Form.Item>

      <Form.Item
        label="Тренировка"
        name="training"
        rules={[{ required: true, message: "Выберите тренировку" }]}
      >
        <Select placeholder="Выберите тренировку" allowClear>
          <Select.Option value="male">Зумба</Select.Option>
          <Select.Option value="female">Стретчинг</Select.Option>
          <Select.Option value="other">Пилатес</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Записанные люди"
        name="clients"
        rules={[
          { required: true, message: "Запишите хотя бы одного человека!" },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Выберите людей"
          onChange={handleChange}
          options={options}
        />
      </Form.Item>
    </Form>
  );
};
