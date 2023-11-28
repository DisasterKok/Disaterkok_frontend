import { useMutation } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';

const useSignIn = () => {
  const signInMutation = useMutation({
    mutationFn: (payload: loginPayload) => {
      return userAPI.login(payload);
    },
  });
  return { signInMutation };
};

export default useSignIn;
