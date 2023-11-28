import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAPI, { registerPayload } from '../../../apis/userAPI';

const useSignUp = () => {
  const { mutate: signUpMutation } = useMutation(
    (payload: registerPayload): Promise<registerPayload> => userAPI.register(payload),
    {
      onSuccess: (data) => {
        console.log(data);
        //   navigate('/signin');
      },
      onError: (error) => {
        throw new Error(error);
      },
    },
  );

  return { signUpMutation };
};

export default useSignUp;
