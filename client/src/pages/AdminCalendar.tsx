import React from "react";
import { Calendar, Modal } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { AdminEventForm } from "../components/AdminEventForm";

export const AdminCalendar = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [dateVal, setDateVal] = React.useState<Dayjs | null>(
    dayjs("2015/01/01")
  );

  // const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  //   console.log(value.format("YYYY-MM-DD"), mode);
  // };

  const onSelect = (date: Dayjs) => {
    setDateVal(date);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Тренировка на дату"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <AdminEventForm date={dateVal as Dayjs} />
      </Modal>

      <Calendar style={{ padding: "10px" }} onSelect={onSelect} />
    </>
  );
};
