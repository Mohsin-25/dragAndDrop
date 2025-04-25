import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DragAndDrop from "./components/DragAndDrop";
import TaskForm from "./components/TaskForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TaskForm />
      <DragAndDrop />
    </div>
  );
}

export default App;
