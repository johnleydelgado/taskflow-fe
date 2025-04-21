import { axiosClient } from "./client";
import type { CreateRespondTaskPayload, CreateTaskPayload, Task } from "./task.types";

export async function fetchAllTasks(): Promise<Task[]> {
  const res = await axiosClient<{ tasks: Task[] }>("/api/tasks/all");
  return res.data.tasks;
}

export function createTaskEmail(
  data: CreateTaskPayload
): Promise<Task> {
  return axiosClient.post<Task>("/api/tasks/email-creation", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }).then(res => res.data);
}



export function updateTask(
 id: string,
 data: Partial<CreateTaskPayload>
): Promise<Task> {
 return axiosClient
   .put<Task>(`/api/tasks/update/${id}`, data, {
     headers: { "Content-Type": "application/json" },
     withCredentials: true,
   })
   .then((res) => res.data);
}


export function deleteTask(id: string): Promise<void> {
 return axiosClient
   .delete<void>(`/api/tasks/delete/${id}`, {
     withCredentials: true,
   })
   .then(() => {});
}


export async function checkTokenValidity(token: string): Promise<{ valid: boolean }> {
  const res = await axiosClient<{ valid: boolean }>(`/api/tasks/token-valid/${token}`);
  return res.data;
}

export async function fetchTaskStatus(token: string): Promise<{ status: string }> {
  const res = await axiosClient<{ status: string }>(`/api/tasks/status/${token}`);
  return res.data;
}

export async function fetchTaskByToken(token: string): Promise<Task> {
  const res = await axiosClient<{ task: Task }>(`/api/tasks/${token}`);
  return res.data.task;
}

export function respond(
  token: string,
  data: Partial<CreateRespondTaskPayload>
 ): Promise<Task> {
  return axiosClient
    .put<Task>(`/api/tasks/task-respond/${token}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => res.data);
 }