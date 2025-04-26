import React from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const Task = ({
  section,
  taskList,
  handleDrop,
  handleDragStart,
  deleteTask,
  setOpenForm,
}) => {
  return (
    <div
      className="flex flex-col gap-5 bg-white/5 h-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, section)}
    >
      {taskList.map((task, idx) => {
        if (section.value !== task.status.value) return null;
        console.log("ddd", task);
        const isDummyData = task?.id?.startsWith(6) && task?.id?.endsWith(9);
        return (
          <div className="relative group cursor-grab">
            <div
              key={idx}
              data-stage={section.value}
              className="flex flex-col bg-white/5 p-2 border-l-4 hover:bg-white/10 min-h-[92px]
                          data-[stage=done]:border-green-400 data-[stage=todo]:border-blue-400 data-[stage=inProgress]:border-yellow-500"
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
            >
              <span className="text-xl lg:text-2xl font-semibold line-clamp-1 text-ellipsis overflow-hidden">
                {task.title}
              </span>
              <span className="text-base line-clamp-2 text-ellipsis overflow-hidden">
                {task?.description || "---"}
              </span>
            </div>
            <div className="absolute h-full bottom-0 right-0 text-right flex-col justify-between hidden group-hover:flex">
              <span
                title={isDummyData ? "Edit disabled for dummy data" : "Edit"}
                className={`${
                  isDummyData
                    ? "cursor-not-allowed text-gray-600"
                    : "cursor-pointer"
                } p-2`}
              >
                <HiOutlinePencil
                  size={20}
                  onClick={() =>
                    !isDummyData &&
                    setOpenForm({
                      open: true,
                      data: task,
                    })
                  }
                />
              </span>
              <span
                className={`${
                  isDummyData
                    ? "cursor-not-allowed text-gray-600"
                    : "cursor-pointer"
                } p-2`}
                title={
                  isDummyData ? "Delete disabled for dummy data" : "Delete"
                }
              >
                <HiOutlineTrash
                  size={20}
                  onClick={() => deleteTask(task?.id)}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Task;
