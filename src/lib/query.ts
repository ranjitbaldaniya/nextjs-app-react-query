"use client";

import {useQuery}  from '@tanstack/react-query';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface FetchUsersResponse {
  users: User[];
  message: string;
  success: boolean;
}

export const fetchUsers = async (): Promise<FetchUsersResponse> => {
  const response = await fetch('/api/user');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};

export const useFetchUsers = () => {
  return useQuery<FetchUsersResponse, Error>({ queryKey: ['get-users'], queryFn: fetchUsers });
}
