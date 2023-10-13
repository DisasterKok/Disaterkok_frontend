import { useState, useCallback, SetStateAction, Dispatch } from 'react';

type UseInputReturnType = [
  string, // value
  (text: string) => void, // handler
  Dispatch<SetStateAction<string>>, // setValue
];

const useInput = (initialValue = ''): UseInputReturnType => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((text: string) => {
    setValue(text);
  }, []);
  return [value, handler, setValue];
};
export default useInput;
