import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useSetOnoff = (token: string) => {
  const queryClient = useQueryClient();
  const setOnoffMutation = useMutation({
    mutationFn: (id: number) => {
      return UserRegionAPI.setOnOff(id, token);
    },
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries({ queryKey: ['Regions'] });
    },
  });

  return { setOnoffMutation };
};

export default useSetOnoff;
