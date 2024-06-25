import { useMutation } from "@tanstack/react-query";
import { User } from "@/models/User";

export const createUser = async (user: any) => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error creating user");
  }

  return await response.json();
};
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user) => createUser(user),
  });
};
