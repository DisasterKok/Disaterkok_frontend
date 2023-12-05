import { useMutation } from '@tanstack/react-query';
import reportsAPI, { reportPostPayload } from '../../../apis/reportsAPI';

const usePostReport = () => {
  const reportMutation = useMutation({
    mutationFn: (payload: reportPostPayload) => {
      return reportsAPI.post(payload);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { reportMutation };
};

export default usePostReport;
