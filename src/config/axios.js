import { notification } from "antd";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT, USER_INFO_KEY } from "../constants/common";

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    // Authorization: userInfo?.accessToken,
  },
});

request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem(USER_INFO_KEY);

  if (userInfo) {
    userInfo = JSON.parse(userInfo);

    config.headers.Authorization = `Bearer ${userInfo?.accessToken}`;
  }

  console.log(config);
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    notification.error({
      message: error.response.data.content,
    });

    throw new Error(error);
  }
);
