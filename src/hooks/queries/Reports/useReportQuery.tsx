import { useQuery } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportQuery = (id: number) => {
  const reportQuery = useQuery({
    queryKey: ['Report', id],
    queryFn: () => {
      return reportsAPI.get(id);
    },
  });

  return { reportQuery };
};

export default useReportQuery;
