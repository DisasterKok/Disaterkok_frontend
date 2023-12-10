import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const signInMutation = useMutation({
    mutationFn: (payload: loginPayload) => {
      return userAPI.login(payload);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['user'], {
        username: data.user.username,
        token: data.token.access,
      });
    },
  });
  return { signInMutation };
};

export default useSignIn;
