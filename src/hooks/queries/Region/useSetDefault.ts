import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useSetDefault = (id: number, token: string) => {
  const queryClient = useQueryClient();
  const setDefaultMutation = useMutation({
    mutationFn: () => {
      return UserRegionAPI.setDefaultRegion(id, token);
    },
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries({ queryKey: ['Regions'] });
    },
  });

  return { setDefaultMutation };
};

export default useSetDefault;
