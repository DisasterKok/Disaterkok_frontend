import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';
import useUserStorage from './useUserStorage';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const signInMutation = useMutation({
    mutationFn: (payload: loginPayload) => {
      return userAPI.login(payload);
    },
    onSuccess: (data) => {
      const user = {
        username: data.user.username,
        locData: data.exist,
        token: {
          access: data.token.access,
          refresh: data.token.refresh,
        },
      };
      useUserStorage.set(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return { signInMutation };
};

export default useSignIn;
