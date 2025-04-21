import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers,createNewUser, loginUser } from "./user.api";
import type { UserLogin } from "./user.types";

export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: fetchAllUsers });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};


export const useLoginUser = () => {
    return useMutation<UserLogin, Error, { email: string; password: string }>({
      mutationFn: loginUser,
    });
};