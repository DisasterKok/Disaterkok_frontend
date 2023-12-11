import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useSetDefault = (token: string) => {
  const queryClient = useQueryClient();
  const setDefaultMutation = useMutation({
    mutationFn: (id: number) => {
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
