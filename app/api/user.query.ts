import { useQuery, useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
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


export const useLoginUser = (): UseMutationResult<
  UserLogin,
  Error,
  { email: string; password: string }
> => {
  return useMutation<UserLogin, Error, { email: string; password: string }>({
    mutationFn: loginUser,
  });
};