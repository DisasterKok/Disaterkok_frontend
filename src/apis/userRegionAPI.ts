import { instance } from '../lib/axios';

export interface UserRegion {
  id: number;
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

export interface AddressData {
  address: string;
  roadAddress: string;
  zoneCode: string; // 우편번호
  xCoordinate: number;
  yCoordinate: number;
}

export interface AliasData {
  aliasType: 'home' | 'school' | 'work' | 'etc';
  name: string;
  default: boolean;
  onOff: boolean;
}

export interface AliasPayload {
  aliasType: 'home' | 'school' | 'work' | 'etc';
  name: string;
}

const UserRegionAPI = {
  getList: async (token: string) => {
    const response = await instance.get(`/regions/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addRegion: async (payload: UserRegionPayload, token: string) => {
    const response = await instance.post(`/regions/`, payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  },
  getRegionAlias: async (id: number, token: string) => {
    const response = await instance.get(`/regions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateAlias: async (id: number, payload: AliasPayload, token: string) => {
    const response = await instance.put(`/regions/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  },
  deleteRegion: async (id: number, token: string) => {
    const response = await instance.delete(`/regions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  setDefaultRegion: async (id: number, token: string) => {
    const response = await instance.post(`/regions/${id}/default`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  setOnOff: async (id: number, token: string) => {
    const response = await instance.patch(`/regions/${id}/onoff`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default UserRegionAPI;
