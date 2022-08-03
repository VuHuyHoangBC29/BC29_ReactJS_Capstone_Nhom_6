import { request } from "../config/axios";

export const fetchCinemaListApi = (showTimesId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimesId}`,
    method: "GET",
  });
};

export const bookingTicketApi = (data) => {
  return request({
    url: `/QuanLyDatVe/DatVe`,
    method: "POST",
    data,
  });
};
