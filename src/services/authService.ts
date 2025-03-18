import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api/auth',
  withCredentials: true,
});

console.log(process.env.REACT_APP_API_URL)

const getErrorMessage = (error: unknown): string => {
  const err = error as AxiosError;
  return (err.response?.data as any)?.message || "An unexpected error occurred";
};

export const signUp = async (email: string, name: string, password: string) => {
  try {
    return await API.post("/signup", { email, name, password });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await API.post("/signin", { email, password });
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      API.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getToken = () => localStorage.getItem("token");

export const logout = async () => {
  try {
    await API.post("/logout");
  } catch (error) {
    console.error("Logout error:", getErrorMessage(error));
  }
  localStorage.removeItem("token");
  delete API.defaults.headers.common["Authorization"];
};
