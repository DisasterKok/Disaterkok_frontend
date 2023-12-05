import { useMutation } from '@tanstack/react-query';
import reportsAPI from '../../../apis/reportsAPI';

const useReportLike = () => {
  const reportLikeMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) => {
      return reportsAPI.like(id, token);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { reportLikeMutation };
};

export default useReportLike;
