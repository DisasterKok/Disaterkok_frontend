import { useMutation } from '@tanstack/react-query';
import reportsAPI, { reportPostPayload } from '../../../apis/reportsAPI';

const usePostReport = (token: string) => {
  const reportMutation = useMutation({
    mutationFn: (payload) => {
      return reportsAPI.post(payload, token);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { reportMutation };
};

export default usePostReport;
