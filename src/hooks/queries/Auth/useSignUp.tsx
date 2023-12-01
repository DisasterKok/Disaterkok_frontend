import { useMutation } from '@tanstack/react-query';
import userAPI, { registerPayload } from '../../../apis/userAPI';

const useSignUp = () => {
  const signUpMutation = useMutation({
    mutationFn: (payload: registerPayload) => {
      return userAPI.register(payload);
    },
  });

  return { signUpMutation };
};

export default useSignUp;
