import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserRegionAPI, { AliasPayload } from '../../../apis/userRegionAPI';

const useUpdateAlias = (token: string) => {
  const queryClient = useQueryClient();
  const updateAliasMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AliasPayload }) => {
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
