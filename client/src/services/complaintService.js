import api from "./api";

export const createComplaint = async (payload) => {
  const { data } = await api.post("/complaints", payload);
  return data;
};

export const getComplaints = async (params = {}) => {
  const { data } = await api.get("/complaints", { params });
  return data;
};

export const getComplaintStats = async () => {
  const { data } = await api.get("/complaints/stats");
  return data;
};

export const getComplaintById = async (id) => {
  const { data } = await api.get(`/complaints/${id}`);
  return data;
};

export const updateComplaint = async (id, payload) => {
  const { data } = await api.put(`/complaints/${id}`, payload);
  return data;
};

export const deleteComplaint = async (id) => {
  const { data } = await api.delete(`/complaints/${id}`);
  return data;
};

export const analyzeComplaint = async (payload) => {
  const { data } = await api.post("/ai/analyze", payload);
  return data;
};
