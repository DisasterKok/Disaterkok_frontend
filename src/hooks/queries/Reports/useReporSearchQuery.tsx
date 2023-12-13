import { useQuery } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportSearchQuery = (searchInput: string) => {
  const reportListQuery = useQuery({
    queryKey: ['Reports'],
    queryFn: () => {
      return reportsAPI.search(searchInput);
    },
  });

  return { reportListQuery };
};

export default useReportSearchQuery;
