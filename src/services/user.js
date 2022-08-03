import { request } from "../config/axios";

export const loginApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data,
  });
};
