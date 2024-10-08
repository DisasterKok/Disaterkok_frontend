import { ImageURISource } from 'react-native';
import { instance } from '../lib/axios';

export interface reportPostPayload {
  title: string;
  content: string;
  images: ImageURISource[];
  tags: string[];
  is_anonymous: boolean;
}

const reportsAPI = {
  list: async (token: string) => {
    const res = await instance.get(`/posts/post/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  search: async (search: string) => {
    const res = await instance.get(`/posts/post/`, {
      params: { search },
    });
    return res.data;
  },
  get: async (id: number, token: string) => {
    const res = await instance.get(`/posts/post/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  post: async (payload: reportPostPayload, token: string) => {
    const res = await instance.post(`/posts/post/`, payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  patch: async (id: number, payload: reportPostPayload) => {
    const res = await instance.patch(`/posts/post/${id}/`, payload);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await instance.delete(`/posts/post/${id}/`);
    return res.data;
  },
  like: async (id: number, token: string) => {
    const headers = token ? { headers: { Authorization: `Token ${token}` } } : { headers: {} };
    const res = await instance.post(`/posts/post/${id}/likes/`, headers);
    return res.data;
  },
};

export default reportsAPI;
