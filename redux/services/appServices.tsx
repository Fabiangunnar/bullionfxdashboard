import axios from "axios";

const API = axios.create({
  // baseURL: `http://localhost:8080/api/v1`,
  baseURL: `https://bullion-fx-server.onrender.com/api/v1`,
});

//  Auth Register
export const loginAdminApi = async (formData: any) => {
  const { data } = await API.post("/user/admin/login", formData);
  if (data) localStorage.setItem("admin", JSON.stringify(data.data));
  return data.data;
};

export const UpdateUserCurrencyApi = async (
  id: any,
  currencyId: string,
  accountInfo: any
) => {
  const { data } = await API.patch(`/user/${id}/${currencyId}`, {
    balance: Number(accountInfo.balance),
  });
  return data.data;
};

export const UpdateUserApi = async (id: any, accountInfo: any) => {
  const { data } = await API.patch(`/user/${id}`, {
    balance: Number(accountInfo.balance),
  });
  return data.data;
};

export const GetTransactionsApi = async (id: any) => {
  const { data } = await API.get(`/user/${id}/transaction`);
  return data.data;
};
export const DeleteTransactionApi = async (id: any) => {
  const { data } = await API.delete(`/user/${id}/transaction`);
  return data.data;
};

export const GetUserApi = async (id: any) => {
  const { data } = await API.get(`/user/${id}`);
  return data.data;
};

export const GetAllUsersApi = async () => {
  const { data } = await API.get(`/user`);
  if (window !== undefined) {
    localStorage.setItem("users", JSON.stringify(data.data));
  }
  return data.data;
};
