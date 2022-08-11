import { GROUP_ID } from "constants/common";
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
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};

export const fetchUserTypeApi = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
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

export const deleteUserApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    method: "DELETE",
  });
};

export const editUserByAdminApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "POST",
    data,
  });
};

export const editUserByUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    data,
  });
};

export const fetchUserInfoApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
    method: "POST",
  });
};

export const fetchAccountInfoApi = () => {
  return request({
    url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
  });
};
