import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import useUserStorage from './useUserStorage';

export function useSignOut() {
  const queryClient = useQueryClient();

  const signOut = useCallback(() => {
    useUserStorage.remove();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  return signOut;
}
