import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useUserAsyncStorage from './useUserAsyncStorage';

const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => useUserAsyncStorage.get(),
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
    isLoading,
  };
};

export default useUser;
