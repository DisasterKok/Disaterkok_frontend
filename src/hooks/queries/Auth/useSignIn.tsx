import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const signInMutation = useMutation({
    mutationFn: (payload: loginPayload) => {
      return userAPI.login(payload);
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(['user'], data);
    },
  });
  return { signInMutation };
};

export default useSignIn;
