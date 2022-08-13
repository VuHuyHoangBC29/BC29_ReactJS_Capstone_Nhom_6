import { maHeThongRap } from "constants/common";
import { request } from "../config/axios";

export const fetchMovieShowTimesApi = (movieId) => {
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

export const fetchCinemaSytemApi = (maHeThongRap) => {
  return request({
    url: `/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${maHeThongRap}`,
    method: "GET",
  });
};

export const fetchCinamaGroupBySytemApi = (maHeThongRap) => {
  return request({
    url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
    method: "GET",
  });
};
