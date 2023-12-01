import { useQuery } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportListQuery = () => {
  const reportListQuery = useQuery({
    queryKey: ['Reports'],
    queryFn: () => {
      return reportsAPI.list();
    },
  });

  return { reportListQuery };
};

export default useReportListQuery;
