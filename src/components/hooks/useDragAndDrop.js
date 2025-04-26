import { useEffect, useState } from "react";
import { columns, dummyData } from "../utils/constants";

const useDragAndDrop = () => {
  const data = localStorage.getItem("listData");
  const listData = data ? JSON.parse(data) : [];

  const [taskList, setTaskList] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    setTaskList(listData);
  }, [JSON.stringify(data), JSON.stringify(listData)]);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (!draggedTask) {
      return;
    }

    const updatedList = taskList.map((task) => {
      if (task === draggedTask) {
        return {
          ...task,
          status: columns.find((col) => col.value === newStatus),
        };
      }
      return task;
    });

    setTaskList(updatedList);
    localStorage.setItem("listData", JSON.stringify(updatedList));
    setDraggedTask(null);
  };

  const handleAddDummyData = () => {
    localStorage.setItem("listData", JSON.stringify(dummyData));
    setTaskList(dummyData);
  };

  const handleClearTable = () => {
    localStorage.setItem("listData", JSON.stringify([]));
    setTaskList([]);
  };

  const todoCount =
    taskList.filter((task) => task.status.value === "todo").length || "0";

  const inProgressCount =
    taskList.filter((task) => task.status.value === "inProgress").length || "0";

  const doneCount =
    taskList.filter((task) => task.status.value === "done").length || "0";

  return {
    values: { todoCount, inProgressCount, doneCount, taskList },
    events: {
      handleAddDummyData,
      handleClearTable,
      handleDrop,
      handleDragStart,
      setTaskList,
    },
  };
};

export default useDragAndDrop;
