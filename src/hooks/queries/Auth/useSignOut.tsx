import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export function useSignOut() {
  const queryClient = useQueryClient();

  const signOut = useCallback(() => {
    queryClient.setQueryData(['user'], null);
  }, [queryClient]);

  return signOut;
}
