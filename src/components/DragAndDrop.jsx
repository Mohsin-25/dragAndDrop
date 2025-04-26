import React from "react";
import useDragAndDrop from "./hooks/useDragAndDrop";
import TaskForm from "./TaskForm";
import Button from "./utils/Button";
import { columns } from "./utils/constants";
import Modal from "./utils/Modal";

const DragAndDrop = () => {
  const {
    values: { todoCount, inProgressCount, doneCount, taskList },
    events: {
      handleAddDummyData,
      handleClearTable,
      handleDrop,
      handleDragStart,
      setTaskList,
    },
  } = useDragAndDrop();

  return (
    <div className="flex flex-col w-full h-full justify-between gap-4 m-4">
      <div className="w-[95vw] lg:w-[80vw] h-[90vh] flex flex-col gap-4">
        <div className=" h-fit w-full flex flex-col sm:flex-row gap-4 text-2xl lg:text-3xl justify-between rounded-lg">
          {taskList?.length > 1 && (
            <div className="flex">
              <span className="flex justify-center mr-3 bg-white/20 rounded-md items-center w-[35px] h-[35px] ">
                {taskList?.length}
              </span>
              <span className="">
                {taskList?.length > 1 ? "Tasks" : "Task"}
              </span>
            </div>
          )}
          <div className="flex gap-4 justify-end">
            <Button onClick={handleAddDummyData}>Add Dummy Tasks</Button>
            <Button onClick={handleClearTable}>Clear Table</Button>
            <Modal
              title="Add new task"
              trigger={({ open }) => (
                <Button onClick={open}>+ Add new task</Button>
              )}
            >
              {({ close }) => (
                <TaskForm onClose={close} setTaskList={setTaskList} />
              )}
            </Modal>
          </div>
        </div>
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
                <div
                  data-stage={section.value}
                  className="data-[stage=done]:bg-green-400 data-[stage=todo]:bg-blue-400 data-[stage=inProgress]:bg-yellow-500
                  h-fit w-full flex sm:flex-row flex-col-reverse sm:gap-3 items-center justify-center text-2xl lg:text-3xl sm:p-4 pb-2"
                >
                  <span
                    data-stage={section.value}
                    className="flex justify-center rounded-md items-center w-[35px] h-[35px] text-xl lg:text-3xl
                    data-[stage=done]:bg-green-200 data-[stage=todo]:bg-blue-200 data-[stage=inProgress]:bg-yellow-200
                    data-[stage=done]:text-green-400 data-[stage=todo]:text-blue-400 data-[stage=inProgress]:text-yellow-500"
                  >
                    {(isToDo && todoCount) ||
                      (isInProgress && inProgressCount) ||
                      (isDone && doneCount)}
                  </span>
                  <span className="whitespace-nowrap">{section.label}</span>
                </div>

                <div
                  className="flex flex-col gap-5 bg-white/5 h-full"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, section.value)}
                >
                  {taskList.map((task, idx) => {
                    if (section.value !== task.status.value) return null;

                    return (
                      <div
                        key={idx}
                        data-stage={section.value}
                        className="flex flex-col bg-white/5 p-2 border-l-4 hover:bg-white/10
                        data-[stage=done]:border-green-400 data-[stage=todo]:border-blue-400 data-[stage=inProgress]:border-yellow-500"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                      >
                        <span className="text-xl lg:text-2xl font-semibold">
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
