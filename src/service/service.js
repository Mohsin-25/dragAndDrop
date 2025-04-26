import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate, data, isloading } = useMutation({
    mutationFn: (newTask) =>
      axios.post(
        "https://680ce9ea2ea307e081d56b0c.mockapi.io/api/tasks",
        newTask
      ),
    onSuccess: (res) => {
      if (res?.status >= 200 && res?.status <= 299) {
        queryClient.invalidateQueries(["getTasks"]);
      }
    },
  });

  return { createTask: mutate };
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate, data, isloading } = useMutation({
    mutationFn: (id) =>
      axios.delete(
        `https://680ce9ea2ea307e081d56b0c.mockapi.io/api/tasks/${id}`
      ),
    onSuccess: (res) => {
      if (res?.status >= 200 && res?.status <= 299) {
        queryClient.invalidateQueries(["getTasks"]);
      }
    },
  });

  return { deleteTask: mutate };
}

export function useFetchTasks() {
  const { data, isloading } = useQuery({
    queryKey: ["getTasks"],
    queryFn: () =>
      axios.get("https://680ce9ea2ea307e081d56b0c.mockapi.io/api/tasks"),
  });
  return { tasks: data?.data || [] };
}
