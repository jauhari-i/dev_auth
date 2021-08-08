import axios from "axios";
import { clearStorages, getToken } from "./storage";

const baseUrl = "http://localhost:9000";

const BASIC_AUTH = {
  Authorization:
    "Basic YXV0aDo3MTcyNDhiYi05ZGJkLTQ5YjktYWUwNi1lNGM5MTg5Y2E4OTU=",
};

const BEARER_AUTH = { Authorization: `Bearer ${getToken()}` };

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: "error",
          message: "Failed to fetch data. Please contact developer.",
        };

        if (!err.response) reject(defaultError);
        else if (err.response.status === 401) {
          reject(err.response);
          clearStorages();
          location.href = "/login";
        } else if (!err.response.data) reject(defaultError);
        else reject(err.response.data);
      });
  });
};

export const registerUser = async (data) =>
  await fetch(`${baseUrl}/api/register`, "post", data, { headers: BASIC_AUTH });

export const loginUser = async (data) =>
  await fetch(`${baseUrl}/api/login`, "post", data, { headers: BASIC_AUTH });

export const getProfile = async () =>
  await fetch(`${baseUrl}/api/profile`, "get", { headers: BEARER_AUTH });

export const updateProfile = async (data) =>
  await fetch(`${baseUrl}/api/update`, "put", data, { headers: BEARER_AUTH });

export const authGoogle = async (data) =>
  await fetch(`${baseUrl}/api/auth/google`, "post", data, {
    headers: BASIC_AUTH,
  });

export const authFacebook = async (data) =>
  await fetch(`${baseUrl}/api/auth/facebook`, "post", data, {
    headers: BASIC_AUTH,
  });

export const authGithub = async (code) =>
  await fetch(`${baseUrl}/api/auth/gh/${code}`, "get", { headers: BASIC_AUTH });
