import { request } from "../config/axios";

export const fetchMovieShowTimesApi = (movieId) => {
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

