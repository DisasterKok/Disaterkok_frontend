import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useUserAsyncStorage from './useUserAsyncStorage';

const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => useUserAsyncStorage.get(),
    staleTime: 300000,
    gcTime: 0,
  });

  useEffect(() => {
    const updateUserAsyncStorage = async () => {
      try {
        if (user) {
          await useUserAsyncStorage.set(user);
        } else {
          await useUserAsyncStorage.remove();
        }
      } catch (error) {
        console.error('Error updating user in AsyncStorage:', error);
      }
    };

    if (!isLoading) {
      updateUserAsyncStorage();
    }
  }, [user, isLoading]);

  return {
    user: user || null,
  };
};

export default useUser;
