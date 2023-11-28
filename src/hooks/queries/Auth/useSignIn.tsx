import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';

const useSignIn = () => {
  const { mutate: signInMutation } = useMutation(
    (payload: loginPayload) => userAPI.login(payload),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  return { signInMutation };
};

export default useSignIn;
