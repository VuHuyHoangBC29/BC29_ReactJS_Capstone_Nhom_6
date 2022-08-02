import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCinemaListApi } from "../../services/booking";

export default function Booking() {
  const params = useParams();

  const [cinemaInfo, setCinemaInfo] = useState();

  useEffect(() => {
    fetchCinemaList();
  }, []);

  const fetchCinemaList = async () => {
    const result = await fetchCinemaListApi(params.showTimesId);

    setCinemaInfo(result.data.content);

    console.log(result.data.content);
  };

  console.log(cinemaInfo.thongTinPhim.TenPhim);

  return cinemaInfo ? (
    <div className="row mx-auto my-5 w-75">
      <div className="col-8">
        <button className="btn">01</button>
        <button className="btn">01</button>
        <button className="btn">01</button>
      </div>
      <div className="col-4">
        <img src="" alt="" />
        {/* <h4>Tên phim: {cinemaInfo.thongTinPhim.tenPhim}</h4>
        <h5>Mô tả: {cinemaInfo.thongTinphim.moTa}</h5> */}
        <p>Ghế: 01, 02, 03</p>
        <p>Tổng tiền: 5 cành</p>
      </div>
    </div>
  ) : (
    "LOADING..."
  );
}
