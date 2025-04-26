import React, { useState } from "react";
import Button from "./utils/Button";
import Dropdown from "./utils/Dropdown";
import TextField from "./utils/TextField";
import { columns } from "./utils/constants";
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../service/service";

const TaskForm = ({ onClose, setTaskList, openForm, setOpenForm }) => {
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();

  const [userData, setUserData] = useState({
    title: openForm?.data?.title || "",
    description: openForm?.data?.description || "",
    status: openForm?.data?.status || {},
  });

  const handleSubmit = (data) => {
    if (!isNaN(openForm?.data?.id)) {
      updateTask({ ...data, id: openForm?.data?.id });
    } else {
      createTask(data);
    }
    setOpenForm({
      open: false,
      data: {},
    });
    onClose && onClose();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(userData);
        }}
        className="flex flex-col gap-4 items-center"
      >
        <TextField
          label="Title"
          slug="title"
          setDataFn={setUserData}
          required={true}
          data={userData}
          maxLength=""
        />
        <TextField
          label="Description"
          slug="description"
          setDataFn={setUserData}
          data={userData}
          maxLength=""
        />
        <Dropdown
          label="Status"
          slug="status"
          setDataFn={setUserData}
          required={true}
          data={userData}
          options={columns}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TaskForm;
