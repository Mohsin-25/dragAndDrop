import React, { useEffect, useState } from "react";
import Modal from "./utils/Modal";
import TaskForm from "./TaskForm";
import Button from "./utils/Button";
import { columns } from "./utils/constants";

const DragAndDrop = () => {
  const data = localStorage.getItem("listData");
  const listData = data ? JSON.parse(data) : [];

  const [taskList, setTaskList] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    setTaskList(listData);
  }, [data]);

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

  const todoCount =
    taskList.filter((task) => task.status.value === "todo").length || "0";

  const inProgressCount =
    taskList.filter((task) => task.status.value === "inProgress").length || "0";

  const doneCount =
    taskList.filter((task) => task.status.value === "done").length || "0";

  return (
    <div className="flex flex-col w-full h-full justify-between gap-4">
      <Modal
        title="Add new task"
        trigger={({ open }) => <Button onClick={open}>+ Add new task</Button>}
      >
        {({ close }) => <TaskForm onClose={close} />}
      </Modal>

      <div className="w-[80vw] h-[80vh]">
        <div className="w-full h-full flex gap-4">
          {columns.map((section, index) => {
            const isToDo = section.value === "todo";
            const isInProgress = section.value === "inProgress";
            const isDone = section.value === "done";

            return (
              <div
                key={section.value}
                className="w-full flex flex-col gap-5 rounded-lg overflow-auto scrollbar-hide"
              >
                <span
                  data-stage={section.value}
                  className="data-[stage=done]:bg-green-400 data-[stage=todo]:bg-blue-400 data-[stage=inProgress]:bg-yellow-500
                  h-fit w-full flex justify-center text-3xl py-4"
                >
                  <span
                    data-stage={section.value}
                    className="flex justify-center mr-3 rounded-md items-center w-[35px] h-[35px]
                    data-[stage=done]:bg-green-200 data-[stage=todo]:bg-blue-200 data-[stage=inProgress]:bg-yellow-200
                    data-[stage=done]:text-green-400 data-[stage=todo]:text-blue-400 data-[stage=inProgress]:text-yellow-500"
                  >
                    {(isToDo && todoCount) ||
                      (isInProgress && inProgressCount) ||
                      (isDone && doneCount)}
                  </span>
                  {section.label}
                </span>

                <div
                  className="flex flex-col gap-5 bg-white/10 h-full"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, section.value)}
                >
                  {taskList.map((task, idx) => {
                    if (section.value !== task.status.value) return null;

                    return (
                      <div
                        key={task.id || idx}
                        data-stage={section.value}
                        className="flex flex-col bg-white/10 p-2 border-l-4
                        data-[stage=done]:border-green-400 data-[stage=todo]:border-blue-400 data-[stage=inProgress]:border-yellow-500"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                      >
                        <span className="text-2xl font-semibold">
                          {task.title}
                        </span>
                        <span className="text-base">{task.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
