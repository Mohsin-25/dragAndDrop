import { useState } from "react";
import "./App.css";
import DragAndDrop from "./components/DragAndDrop";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <DragAndDrop />
    </div>
  );
}

export default App;
