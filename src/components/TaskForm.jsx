import React, { useState } from "react";
import Button from "./utils/Button";
import Dropdown from "./utils/Dropdown";
import TextField from "./utils/TextField";
import { columns } from "./utils/constants";
import { useCreateTask, useDeleteTask } from "../service/service";

const TaskForm = ({ onClose, setTaskList }) => {
  const { createTask } = useCreateTask();

  const [userData, setUserData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleSubmit = (data) => {
    createTask(data);

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
          // validation="alphanumeric"
        />
        <TextField
          label="Description"
          slug="description"
          setDataFn={setUserData}
          // required={true}
          data={userData}
          maxLength=""
          // validation="alphanumeric"
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
