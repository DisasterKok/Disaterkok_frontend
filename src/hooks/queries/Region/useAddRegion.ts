import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI, { UserRegionPayload } from '../../../apis/userRegionAPI';

const useAddRegion = (token: string) => {
  const queryClient = useQueryClient();
  const addRegionMutation = useMutation({
    mutationFn: (payload: UserRegionPayload) => {
      return UserRegionAPI.addRegion(payload, token);
    },
    onSuccess: (data) => {
      //sconsole.log(data);
      queryClient.invalidateQueries({ queryKey: ['Regions'] });
    },
  });

  return { addRegionMutation };
};

export default useAddRegion;
