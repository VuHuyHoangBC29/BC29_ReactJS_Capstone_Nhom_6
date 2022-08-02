import axios from "axios";
import { request } from "../config/axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/common";

export const fetchMovieListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP02`,
    method: "GET",
  });
};

export const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};
