import axios from "axios";
import { request } from "../config/axios";
import { BASE_URL, GROUP_ID, TOKEN_CYBERSOFT } from "../constants/common";

export const fetchMovieListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
    method: "GET",
  });
};

export const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

export const deleteMovieApi = (movieId) => {
  return request({
      url: `/QuanLyPhim/XoaPhim?MaPhim=${movieId}`,
      method: "DELETE",
  })
}

export const fetchBannerListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
  });
};

export const addMovieUploadImage = (data) => {
  return request({
    url: `QuanLyPhim/ThemPhimUploadHinh`,
    method: "POST",
    data,
  });
};

export const updateMovieUploadImage = (data) => {
  return request({
    url: `QuanLyPhim/CapNhatPhimUpload`,
    method: "POST",
    data,
  });
};