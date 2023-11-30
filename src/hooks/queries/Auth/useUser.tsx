import { useQuery } from '@tanstack/react-query';
import * as userAsyncStorage from './useAsyncStorage';
import { useEffect } from 'react';

const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    initialData: userAsyncStorage.getUser(),
  });
  console.log(user);

  useEffect(() => {
    if (!user) userAsyncStorage.removeUser();
    else userAsyncStorage.saveUser(user);
  }, [user]);

  return {
    user: user || null,
  };
};

export default useUser;
