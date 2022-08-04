import { request } from "../config/axios";

export const loginApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data,
  });
};

export const registerUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data,
  });
};

export const fetchUserListApi = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
    method: "GET",
  });
};

export const addUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data,
  });
};
