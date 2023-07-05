import React from "react";
import { Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import findSubscription from "../utils/findSubscription";

interface DataType {
  key: string;
  cardNumber: number;
  name: string;
  phoneNumber: string;
  subscription: string | null;
  trainingsLeft: string | null;
  expirationDate: Date | null;
}

const { Text } = Typography;

const columns: ColumnsType<DataType> = [
  {
    title: "номер карты",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Фамилия Имя Отчество",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Абонемент",
    key: "subscriptionTitle",
    dataIndex: "subscriptionTitle",
    render: (text) => <Tag>{text}</Tag>,
  },
  {
    title: "Остаток",
    dataIndex: "trainingsLeft",
    key: "trainingsLeft",
  },
  {
    title: "Дата окончания",
    dataIndex: "expirationDate",
    key: "expirationDate",
    render: (date) => (
      <Text type={date > Date.now() ? "success" : "danger"}>
        {date ? new Date(date).toLocaleDateString() : " "}
      </Text>
    ),
  },
];

export const ClientTable = () => {
  const isFirstRender = React.useRef(true);
  const [clients, setClients] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([]);

  const fetching = React.useCallback(async () => {
    const subs = await PostService.getAllSubscriptions(true);
    setSubscriptions(subs);

    const res = await PostService.getAllClientProfiles();

    const mapedRes = res.map((profile) => {
      const subscriptionObject = findSubscription(profile?.subscription, subs);

      return {
        key: profile?.cardNumber,
        subscriptionTitle: subscriptionObject?.title,
        ...profile,
      };
    });

    setClients(mapedRes);
  }, []);

  const [fetchProfiles, isProfilesLoading, profilesError] =
    useFetching(fetching);

  React.useEffect(() => {
    if (isFirstRender.current) {
      fetchProfiles();
      isFirstRender.current = false;
    }
  }, []);

  return (
    <Table loading={isProfilesLoading} columns={columns} dataSource={clients} />
  );
};
