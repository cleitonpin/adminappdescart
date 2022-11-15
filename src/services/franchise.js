import { api } from "./api";

export const createFranchise = async (data) => {
  const response = await api.post("/franchise", data);

  return response.data;
};

export const loginFranchise = async (data) => {
  const response = await api.post("/franchise/login", data);

  return response.data;
}

export const updateFranchise = async (data, id, token) => {
  const response = await api.put(`/franchise/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const forgotPassword = async (data) => {
  const response = await api.post("/franchise/forgot-password", data);

  return response.data;
}

export const resetPassword = async (data, token) => {
  const response = await api.post("/franchise/reset-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false
  });

  return response.data;
}