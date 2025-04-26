import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import DragAndDrop from "./components/DragAndDrop";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000, //5 seconds
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex justify-center items-center">
        <DragAndDrop />
      </div>
    </QueryClientProvider>
  );
}

export default App;
