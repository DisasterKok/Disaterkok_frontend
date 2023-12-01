import { instance } from '../lib/axios';

export interface reportPostPayload {
  user: number;
  title: string;
  content: string;
}

const reportsAPI = {
  list: async () => {
    const res = await instance.get(`/posts/post`);
    return res.data;
  },
  get: async (id: number) => {
    const res = await instance.get(`/posts/post/${id}/`);
    return res.data;
  },
  post: async (payload: reportPostPayload) => {
    const res = await instance.post(`/posts/post/`, payload);
    return res.data;
  },
  patch: async (id: number, payload: reportPostPayload) => {
    const res = await instance.patch(`/posts/post/${id}`, payload);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await instance.delete(`/posts/post/${id}`);
    return res.data;
  },
};

export default reportsAPI;
