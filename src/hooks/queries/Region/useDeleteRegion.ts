import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useDeleteRegion = (id: number, token: string) => {
  const queryClient = useQueryClient();
  const deleteRegionMutation = useMutation({
    mutationFn: () => {
      return UserRegionAPI.deleteRegion(id, token);
    },
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries({ queryKey: ['Regions'] });
    },
  });

  return { deleteRegionMutation };
};

export default useDeleteRegion;
