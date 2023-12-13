import { useQuery } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportListQuery = (token: string) => {
  const reportListQuery = useQuery({
    queryKey: ['Reports'],
    queryFn: () => {
      return reportsAPI.list(token);
    },
  });

  return { reportListQuery };
};

export default useReportListQuery;
