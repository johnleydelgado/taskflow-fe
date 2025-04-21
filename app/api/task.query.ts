import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRespondTaskPayload, CreateTaskPayload, Task } from "./task.types";
import { checkTokenValidity, createTaskEmail, deleteTask, fetchAllTasks, fetchTaskByToken, fetchTaskStatus, respond, updateTask } from "./task.api";

export const useTasks = () =>
  useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks,
    staleTime: 0,
  });

export function useCreateTaskEmail() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTaskPayload>({
    mutationFn: createTaskEmail,
    onSuccess: () => {
      // if you have a `useTasks()` list query keyed by ["tasks"], invalidate it:
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

/** Mutation to update an existing task */
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { id: string; data: Partial<CreateTaskPayload> }>({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}


export function useTaskRespond() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { token: string; data: Partial<CreateRespondTaskPayload> }>({
    mutationFn: ({ token, data }) => respond(token, data),
    onSuccess: (_result, { token }) => {
      // 1) Refresh the main tasks list if you're showing it somewhere
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      // 2) Invalidate the per‑token validity & status queries
      queryClient.invalidateQueries({ queryKey: ["task", "token-valid", token] });
      queryClient.invalidateQueries({ queryKey: ["task", "status", token] });
    },
  });
}

/** Mutation to delete a task */
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}


export function useTokenValidity(token: string) {
  return useQuery({
    queryKey: ["task", "token-valid", token],
    queryFn: () => checkTokenValidity(token),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
  });
}


export function useTaskStatus(token: string) {
  return useQuery({
    queryKey: ["task", "status", token],
    queryFn: () => fetchTaskStatus(token),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetTaskByToken(token: string) {
  return useQuery({
    queryKey: ["task", "token", token],
    queryFn: () => fetchTaskByToken(token),
    staleTime: 0,
  });
}