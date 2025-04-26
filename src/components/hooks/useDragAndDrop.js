import { useEffect, useState } from "react";
import {
  useDeleteTask,
  useFetchTasks,
  useUpdateTask,
} from "../../service/service";
import { columns, dummyData } from "../utils/constants";

const useDragAndDrop = () => {
  const [taskList, setTaskList] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  const { tasks } = useFetchTasks();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();

  useEffect(() => {
    setTaskList(tasks);
  }, [JSON.stringify(tasks)]);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (!draggedTask) {
      return;
    }

    const updatedList = taskList.map((task) => {
      if (task?.id == draggedTask?.id) {
        return {
          ...task,
          status: columns.find((col) => col.value === newStatus?.value),
        };
      }
      return task;
    });

    const taskPayload = {
      ...draggedTask,
      status: newStatus,
    };

    updateTask(taskPayload);
    setTaskList(updatedList);
    setDraggedTask(null);
  };

  const handleAddDummyData = () => {
    setTaskList(dummyData);
  };

  const handleClearTable = () => {
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
      deleteTask,
    },
  };
};

export default useDragAndDrop;
