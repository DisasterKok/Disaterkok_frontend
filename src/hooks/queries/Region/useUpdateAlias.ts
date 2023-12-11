import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useUpdateAlias = (id: number, token: string) => {
  const queryClient = useQueryClient();
  const updateAliasMutation = useMutation({
    mutationFn: (payload: { aliasType: 'home' | 'school' | 'work' | 'etc'; name: string }) => {
      return UserRegionAPI.updateAlias(id, payload, token);
    },
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries({ queryKey: ['Regions'] });
    },
  });

  return { updateAliasMutation };
};

export default useUpdateAlias;
