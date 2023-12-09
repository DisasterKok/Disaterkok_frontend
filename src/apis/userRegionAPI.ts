import { instance } from '../lib/axios';

export interface UserRegionPayload {
  name: string;
  address: string;
  roadAddress: string;
  zoneCode: string;
  xCoordinate: number;
  yCoordinate: number;
  aliasType: 'home' | 'school' | 'work' | 'etc';
  default: boolean;
  onOff: boolean;
}

const UserRegionAPI = {
  getList: async () => {
    const response = await instance.get(`/regions/`);
    return response.data;
  },
  addRegion: async (payload: UserRegionPayload) => {
    const response = await instance.post(`/regions/`, payload);
    return response.data;
  },
  getRegionAlias: async (id: number, payload: { regionId: number }) => {
    const response = await instance.get(`/regions/${id}`, { params: payload });
    return response.data;
  },
  editAlias: async (
    id: number,
    payload: { aliasType: 'home' | 'school' | 'work' | 'etc'; name: string },
  ) => {
    const response = await instance.patch(`/regions/${id}`, payload);
    return response.data;
  },
  deleteRegion: async (id: number) => {
    const response = await instance.delete(`/regions/${id}`);
    return response.data;
  },
  setDefaultRegion: async (id: number) => {
    const response = await instance.post(`/regions/${id}/default`);
    return response.data;
  },
  setOnOff: async (id: number) => {
    const response = await instance.patch(`/regions/${id}/onoff`);
    return response.data;
  },
};

export default UserRegionAPI;
