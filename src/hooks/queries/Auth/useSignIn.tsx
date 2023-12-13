import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAPI, { loginPayload } from '../../../apis/userAPI';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const signInMutation = useMutation({
    mutationFn: (payload: loginPayload) => {
      return userAPI.login(payload);
    },
    onSuccess: (data) => {
      // 추후에 user / locData 캐싱 키 분리 및 api 연결 후 기능 연결
      queryClient.setQueryData(['user'], {
        username: data.user.username,
        token: data.token.access,
        locData: Boolean(data.exist),
      });
    },
  });
  return { signInMutation };
};

export default useSignIn;
