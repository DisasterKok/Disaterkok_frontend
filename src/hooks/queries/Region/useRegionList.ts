import { useQuery } from '@tanstack/react-query';
import UserRegionAPI from '../../../apis/userRegionAPI';

const useRegionListQuery = (token: string) => {
  const regionListQuery = useQuery({
    queryKey: ['Regions'],
    queryFn: () => {
      return UserRegionAPI.getList(token);
    },
  });

  return { regionListQuery };
};

export default useRegionListQuery;
