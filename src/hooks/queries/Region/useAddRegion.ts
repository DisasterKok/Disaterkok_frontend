import { useMutation } from '@tanstack/react-query';
import UserRegionAPI, { UserRegionPayload } from '../../../apis/userRegionAPI';

const useAddRegion = (token: string) => {
  const addRegionMutation = useMutation({
    mutationFn: (payload: UserRegionPayload) => {
      return UserRegionAPI.addRegion(payload, token);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { addRegionMutation };
};

export default useAddRegion;
