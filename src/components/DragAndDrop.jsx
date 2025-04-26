import React, { useState } from "react";
import useDragAndDrop from "./hooks/useDragAndDrop";
import TaskForm from "./TaskForm";
import Button from "./utils/Button";
import { columns } from "./utils/constants";
import Modal from "./utils/Modal";
import Columns from "./uiComponents/Columns";
import Task from "./uiComponents/Task";

const DragAndDrop = () => {
  const [openForm, setOpenForm] = useState({
    open: false,
    data: {},
  });
  const {
    values: { todoCount, inProgressCount, doneCount, taskList },
    events: {
      handleAddDummyData,
      handleClearTable,
      handleDrop,
      handleDragStart,
      setTaskList,
      deleteTask,
    },
  } = useDragAndDrop();

  return (
    <div className="flex flex-col w-full h-full justify-between gap-4 m-4">
      <div className="w-[95vw] lg:w-[80vw] h-[90vh] flex flex-col gap-4">
        <div className=" h-fit w-full flex flex-col sm:flex-row gap-4 text-2xl lg:text-3xl justify-between rounded-lg">
          <div className="flex">
            {taskList?.length >= 1 && (
              <>
                <span className="flex justify-center mr-3 bg-white/20 rounded-md items-center w-[35px] h-[35px] ">
                  {taskList?.length}
                </span>
                <span className="">
                  {taskList?.length > 1 ? "Tasks" : "Task"}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <Button onClick={handleAddDummyData}>Add Dummy Tasks</Button>
            <Button onClick={handleClearTable}>Clear Board</Button>
            <Modal
              title="Add new task"
              trigger={({ open }) => (
                <Button onClick={open}>+ Add New Task</Button>
              )}
              openExternally={{ openForm, setOpenForm }}
            >
              {({ close }) => (
                <TaskForm
                  onClose={close}
                  setTaskList={setTaskList}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                />
              )}
            </Modal>
          </div>
        </div>
        <div className="w-full h-full flex gap-4">
          {columns.map((section, index) => {
            return (
              <div
                key={section.value}
                className="w-full flex flex-col gap-5 rounded-lg overflow-auto scrollbar-hide"
              >
                <Columns
                  section={section}
                  todoCount={todoCount}
                  inProgressCount={inProgressCount}
                  doneCount={doneCount}
                />
                <Task
                  section={section}
                  taskList={taskList}
                  handleDrop={handleDrop}
                  handleDragStart={handleDragStart}
                  deleteTask={deleteTask}
                  setOpenForm={setOpenForm}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
