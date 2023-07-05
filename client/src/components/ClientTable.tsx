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
  expirationDate: number | null;
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
    render: (name, data) => <a onClick={() => console.log(data)}>{name}</a>,
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
    render: (text, data) => (
      <Tag color={data?.expirationDate > Date.now() ? "success" : "error"}>
        {text}
      </Tag>
    ),
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
  const [clientOnEdit, setClientOnEdit] = React.useState();
  const [clients, setClients] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([]);

  const fetchingClients = React.useCallback(async () => {
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
  const fetchingCurrentClient = React.useCallback(async () => {}, []);

  const [fetchProfiles, isProfilesLoading, profilesError] =
    useFetching(fetchingClients);

  // calls twice because of new react >= 18.00 if we don't use isFirstRender
  // read https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
  React.useEffect(() => {
    if (isFirstRender.current) {
      fetchProfiles();
      isFirstRender.current = false;
    }
  }, []);

  return (
    <Table
      loading={isProfilesLoading}
      columns={columns}
      dataSource={clients}
      bordered
    />
  );
};
