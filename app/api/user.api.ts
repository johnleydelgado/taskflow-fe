import { axiosClient } from "./client";
import type { User, UserLogin } from "./user.types";

export async function fetchAllUsers(): Promise<User[]> {
  const res = await axiosClient<{ users: User[] }>("/api/users/all");
  return res.data.users;
}
export const fetchUser = (id: string) => axiosClient<User>(`/api/users/${id}`);
export const createNewUser = (data: Partial<User>) =>
    axiosClient<User>("/api/users/add", {
    method: "POST",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    withCredentials:true
});


export const loginUser = async (data: { email: string; password: string }): Promise<UserLogin> => {
  const response = await axiosClient.post<UserLogin>(
    "/api/users/login",
    {
      email: data.email,
      passwordHash: data.password,
    },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};