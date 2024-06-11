import axios from "axios";

const API = axios.create({
  baseURL: `https://bullion-fx-server.onrender.com/api/v1`,
});

//  Auth Register
export const loginAdminApi = async (formData: any) => {
  console.log(formData, "formdara");
  const { data } = await API.post("/user/admin/login", formData);
  if (data) localStorage.setItem("admin", JSON.stringify(data.data));
  console.log(data);
  return data.data;
};

export const UpdateUserApi = async (id: any, accountInfo: any) => {
  console.log(id, "id", "accountInfo", accountInfo);
  const { data } = await API.patch(`/user/${id}`, {
    balance: Number(accountInfo.balance),
  });
  console.log(data);
  return data.data;
};

export const GetUserApi = async (id: any) => {
  console.log(id, "iud");
  const { data } = await API.get(`/user/${id}`);
  return data.data;
};

export const GetAllUsersApi = async () => {
  console.log("users");
  const { data } = await API.get(`/user`);
  console.log(data);
  if (window !== undefined) {
    localStorage.setItem("users", JSON.stringify(data.data));
  }
  return data.data;
};
