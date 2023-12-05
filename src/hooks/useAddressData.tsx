import { useState } from 'react';

interface AddressData {
  address: string;
  roadAddress: string;
  zoneCode: string;
  xCoordinate: number;
  yCoordinate: number;
  // 다른 필요한 속성들도 추가 가능
}

const useAddressData = (initialData: AddressData) => {
  const [data, setData] = useState<AddressData>(initialData);

  const setAddressData = (newData: AddressData) => {
    setData(newData);
  };

  const resetAddressData = () => {
    setData(initialData);
  };

  return {
    data,
    setAddressData,
    resetAddressData, // 초기화 함수 추가
  };
};

export default useAddressData;
