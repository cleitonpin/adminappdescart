import { api } from "./api";

export const createFranchise = async (data) => {
  const response = await api.post("/franchise", data);

  return response.data;
};

export const loginFranchise = async (data) => {
  const response = await api.post("/franchise/login", data);

  return response.data;
}