import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "../../modules/seat/seat";
import { bookingTicketApi, fetchCinemaListApi } from "../../services/booking";
import _ from "lodash";

import "./booking.scss";
import { useAsync } from "hook/useAsync";

export default function Booking() {
  const [selectedSeatsList, setSelectedSeatsList] = useState([]);

  const params = useParams();

  const navigate = useNavigate();

  // const [cinemaInfo, setCinemaInfo] = useState();

  // useEffect(() => {
  //   fetchCinemaList();
  // }, []);

  // const fetchCinemaList = async () => {
  //   const result = await fetchCinemaListApi(params.showTimesId);

  //   setCinemaInfo(result.data.content);
  // };

  // console.log(cinemaInfo);

  const { state: cinemaInfo } = useAsync({
    dependecies: [],
    service: () => fetchCinemaListApi(params.showTimesId),
  });

  console.log(cinemaInfo);

  const handleSelect = (selectedSeat) => {
    const data = [...selectedSeatsList];

    const idx = data.findIndex((ele) => ele.tenGhe === selectedSeat.tenGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(selectedSeat);
    }

    setSelectedSeatsList(data);
  };

  const handleBookingTicket = async () => {
    const ticketList = selectedSeatsList.map((ele) => {
      return {
        maGhe: ele.maGhe,
        giaVe: ele.giaVe,
      };
    });

    const submitData = {
      maLichChieu: params.showTimesId,
      danhSachVe: ticketList,
    };

    console.log(submitData);

    if (submitData.danhSachVe.length === 0) {
      alert("Vui lòng chọn ghế muốn đặt!");
    } else {
      await bookingTicketApi(submitData);
      alert("Đặt vé thành công!");
      navigate("/");
    }
  };

  return (
    <div id="booking" className="container-fluid py-3">
      <div className="row mx-5">
        <div className="bookingRight col-12 col-xl-8 text-center">
          <div id="screenPosition">
            <div className="screen mt-3 mx-auto text-dark">
              <p
                className="text-center text-light"
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  position: "absolute",
                  right: "50%",
                  top: "50%",
                  transform: "translatex(50%)",
                }}
              >
                Màn hình
              </p>
            </div>
          </div>
          <div className="seatMap px-auto">
            {cinemaInfo?.danhSachGhe?.map((ele, idx) => {
              return (
                <React.Fragment key={ele.tenGhe}>
                  <Seat handleSelect={handleSelect} item={ele} />
                  {(idx + 1) % 16 === 0 && <br />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="seatTypeChart row mt-5 text-light">
            <div className="col d-flex justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "50px",
                  height: "30px",
                  display: "inline-block",
                }}
              ></div>
              <span className="ml-1" style={{ fontWeight: "bold" }}>
                Ghế trống
              </span>
            </div>

            <div className="col d-flex justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "#ffcf46",
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "50px",
                  height: "30px",
                  display: "inline-block",
                }}
              ></div>
              <span className="ml-1" style={{ fontWeight: "bold" }}>
                Ghế Vip
              </span>
            </div>

            <div className="col d-flex justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "#b61883",
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "50px",
                  height: "30px",
                  display: "inline-block",
                }}
              ></div>
              <span className="ml-1" style={{ fontWeight: "bold" }}>
                Ghế đang đặt
              </span>
            </div>

            <div className="col d-flex justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "rgb(180, 42, 42)",
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "50px",
                  height: "30px",
                  display: "inline-block",
                }}
              ></div>
              <span className="ml-1" style={{ fontWeight: "bold" }}>
                Ghế đã đặt
              </span>
            </div>
          </div>
        </div>
        <div className="bookingLeft col-12 col-xl-4">
          <img
            className="img-fluid"
            src={cinemaInfo?.thongTinPhim.hinhAnh}
            alt="image"
          />
          {/* <h4>
            Tên phim: <br />
            <span>{cinemaInfo.thongTinPhim.tenPhim}</span>
          </h4> */}
          {/* <p>
            Ghế đang chọn: <br />
            {_.sortBy(selectedSeatsList, ["maGhe"]).map((ele, idx) => {
              // let contentSelectedSeat = "";
              // if (idx === selectedSeatsList.length - 1) {
              //   contentSelectedSeat += ele.tenGhe + ".";
              // } else {
              //   contentSelectedSeat += ele.tenGhe + ", ";
              // }
              // return <span key={ele.tenGhe} className="badge badge-success"> {contentSelectedSeat} </span>;
              return (
                <span
                  key={ele.tenGhe}
                  className="badge mr-2"
                  style={{ backgroundColor: "#b61883", color: "white" }}
                >
                  {" "}
                  {ele.tenGhe}{" "}
                </span>
              );
            })}
          </p> */}

          <table className="table table-bordered mt-3  text-light">
            <tbody>
              <tr>
                <th>Tên phim:</th>
                <th>{cinemaInfo?.thongTinPhim.tenPhim}</th>
              </tr>
              <tr>
                <th>Tên rạp:</th>
                <th>{cinemaInfo?.thongTinPhim.tenCumRap}</th>
              </tr>
              <tr>
                <th>Địa chỉ:</th>
                <th>{cinemaInfo?.thongTinPhim.diaChi}</th>
              </tr>
              <tr>
                <th>Thời gian:</th>
                <th>
                  {cinemaInfo?.thongTinPhim.ngayChieu} -{" "}
                  <span>{cinemaInfo?.thongTinPhim.gioChieu} </span>
                </th>
              </tr>
              <tr>
                <th>Ghế đang chọn: </th>
                <th>
                  {_.sortBy(selectedSeatsList, ["maGhe"]).map((ele, idx) => {
                    return (
                      <span
                        className="badge mr-2"
                        key={ele.tenGhe}
                        style={{ backgroundColor: "#b61883", color: "white" }}
                      >
                        {" "}
                        {ele.tenGhe}{" "}
                      </span>
                    );
                  })}
                </th>
              </tr>
              <tr>
                <th>Tổng tiền:</th>
                <th>
                  {selectedSeatsList
                    .reduce((previousValue, currentValue) => {
                      return (previousValue += currentValue.giaVe);
                    }, 0)
                    .toLocaleString()}{" "}
                  VNĐ
                </th>
              </tr>
            </tbody>
          </table>

          <button
            id="btnDatVe"
            onClick={handleBookingTicket}
            className="btn btn-success"
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
}
