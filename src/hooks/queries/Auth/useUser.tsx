import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useUserStorage from './useUserStorage';

interface Token {
  access: string;
  refresh: string;
}

interface UserData {
  username: string;
  locData: boolean;
  token: Token;
}

interface User {
  userData: UserData | null;
  isLoading: boolean;
}

const useUserQuery = () => {
  return useQuery<UserData | undefined>({
    queryKey: ['user'],
    queryFn: async () => {
      const username = await useUserStorage.getUserName();
      const locData = await useUserStorage.getLocData();
      const accessToken = await useUserStorage.getAccessToken();
      const refreshToken = await useUserStorage.getRefreshToken();
      return {
        username,
        locData,
        token: { access: accessToken, refresh: refreshToken },
      };
    },
    staleTime: 300000,
    gcTime: 0,
  });
};

const useUser = (): User => {
  const { data: userData, isLoading } = useUserQuery();

  return {
    userData: userData || null,
    isLoading,
  };
};

export default useUser;
