import React, { useState } from "react";
import Button from "./utils/Button";
import Dropdown from "./utils/Dropdown";
import TextField from "./utils/TextField";
import { columns } from "./utils/constants";

const TaskForm = ({ onClose, setTaskList }) => {
  const data = localStorage.getItem("listData");
  const listData = data ? JSON.parse(data) : [];

  const [userData, setUserData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleSubmit = (data) => {
    localStorage.setItem(
      "listData",
      JSON.stringify([...listData, { ...data, id: new Date().getTime() }])
    );
    setTaskList([...listData, { ...data, id: new Date().getTime() }]);
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
