import React from "react";

const Columns = ({ section, todoCount, inProgressCount, doneCount }) => {
  const isToDo = section.value === "todo";
  const isInProgress = section.value === "inProgress";
  const isDone = section.value === "done";
  return (
    <div
      data-stage={section.value}
      className="data-[stage=done]:bg-green-400 data-[stage=todo]:bg-blue-400 data-[stage=inProgress]:bg-yellow-400
      h-fit w-full flex sm:flex-row flex-col-reverse sm:gap-3 items-center justify-center text-2xl lg:text-3xl sm:p-4 pb-2"
    >
      <span
        data-stage={section.value}
        className="flex justify-center rounded-md items-center w-[35px] h-[35px] text-xl lg:text-3xl
        data-[stage=done]:bg-green-200 data-[stage=todo]:bg-blue-200 data-[stage=inProgress]:bg-yellow-200
        data-[stage=done]:text-green-500 data-[stage=todo]:text-blue-500 data-[stage=inProgress]:text-yellow-500"
      >
        {(isToDo && todoCount) ||
          (isInProgress && inProgressCount) ||
          (isDone && doneCount)}
      </span>
      <span className="whitespace-nowrap">{section.label}</span>
    </div>
  );
};

export default Columns;
