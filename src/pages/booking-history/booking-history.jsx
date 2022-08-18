import { useAsync } from "hook/useAsync";
import { fetchAccountInfoApi } from "services/user";
import { Avatar, Card, Col, Row } from "antd";
import React, { Fragment } from "react";
import { formatDate } from "utils/common";
import _ from "lodash";

import "./booking-history.scss";

export default function BookingHistory() {
  const { state: userInfo } = useAsync({
    dependencies: [],
    service: () => fetchAccountInfoApi(),
  });

  console.log(userInfo);

  const renderBookingHistory = () => {
    return userInfo?.thongTinDatVe?.map((ele) => {
      return (
        <div className="col-4" key={ele.maVe}>
          <div
            className="card movie-card"
            style={{
              marginBottom: 20,
              height: 700,
              border: "1px solid #b61883",
            }}
          >
            <img
              style={{ height: 400, objectFit: "cover" }}
              className="card-img-top"
              src={ele.hinhAnh}
              alt="movie"
              // src={ele.hinhAnh}
              // alt={ele.hinhAnh}
              // width={200}
              // height={250}
              // className="ml-3"
            />
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: "bold" }}>
                {ele.tenPhim}
              </h5>
              <p>
                Ngày đặt:{" "}
                <span style={{ color: "#b61883", fontWeight: "bold" }}>
                  {formatDate(ele.ngayDat, "LLL")}
                </span>
              </p>
              <p>
                Giá vé:{" "}
                <span style={{ color: "#b61883", fontWeight: "bold" }}>
                  {ele.giaVe.toLocaleString()} VNĐ
                </span>
              </p>
              <p>
                Thời lượng:{" "}
                <span style={{ color: "#b61883", fontWeight: "bold" }}>
                  {ele.thoiLuongPhim} phút
                </span>
              </p>
              <p>
                {ele.danhSachGhe.map((ele, index) => {
                  return (
                    <span key={index}>
                      {index === 0 && (
                        <Fragment>
                          Địa chỉ:{" "}
                          <span
                            style={{ color: "#b61883", fontWeight: "bold" }}
                          >
                            {ele.tenHeThongRap} - {ele.tenRap}
                          </span>
                        </Fragment>
                      )}
                    </span>
                  );
                })}
              </p>
              <p>
                Số ghế:{" "}
                {_.sortBy(ele.danhSachGhe, ["tenGhe"]).map((ele, index) => {
                  return (
                    <span
                      style={{ backgroundColor: "#b61883", color: "white" }}
                      key={index}
                      className="badge mr-1"
                    >
                      {ele.tenGhe}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="bookingHistory">
      <div className="w-75 py-5 mx-auto bookingHistoryContent">
        <h1
          className="mb-4"
          style={{ fontFamily: "Pacifico", color: "#b61883" }}
        >
          Danh sách phim đã đặt
        </h1>
        <div className="row mt-3">{renderBookingHistory()}</div>
      </div>
    </div>
  );
}
