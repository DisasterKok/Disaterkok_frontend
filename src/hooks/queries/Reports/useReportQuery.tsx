import { useQuery } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportQuery = (id: number, token: string) => {
  const reportQuery = useQuery({
    queryKey: ['Report', id],
    queryFn: () => {
      return reportsAPI.get(id, token);
    },
  });

  return { reportQuery };
};

export default useReportQuery;
