import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "../../modules/seat/seat";
import { bookingTicketApi, fetchCinemaListApi } from "../../services/booking";
import _ from "lodash";

export default function Booking() {
  const [selectedSeatsList, setSelectedSeatsList] = useState([]);

  const params = useParams();

  const [cinemaInfo, setCinemaInfo] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCinemaList();
  }, []);

  const fetchCinemaList = async () => {
    const result = await fetchCinemaListApi(params.showTimesId);

    setCinemaInfo(result.data.content);
  };

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

  return cinemaInfo ? (
    <div className="row mx-auto my-5 w-75">
      <div className="col-8">
        {cinemaInfo.danhSachGhe.map((ele, idx) => {
          return (
            <React.Fragment key={ele.tenGhe}>
              <Seat handleSelect={handleSelect} item={ele} />
              {(idx + 1) % 16 === 0 && <br />}
            </React.Fragment>
          );
        })}
      </div>
      <div className="col-4">
        <img
          className="img-fluid"
          src={cinemaInfo.thongTinPhim.hinhAnh}
          alt="image"
        />
        <h4>
          Tên phim: <br />
          <span>{cinemaInfo.thongTinPhim.tenPhim}</span>
        </h4>
        {/* <h5>Mô tả: {cinemaInfo?.thongTinphim?.moTa}</h5> */}
        <p>
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
              <span key={ele.tenGhe} className="badge badge-success mr-2">
                {" "}
                {ele.tenGhe}{" "}
              </span>
            );
          })}
        </p>
        <p>
          Tổng tiền:{" "}
          {selectedSeatsList
            .reduce((previousValue, currentValue) => {
              return (previousValue += currentValue.giaVe);
            }, 0)
            .toLocaleString()}{" "}
          VNĐ
        </p>
        <button onClick={handleBookingTicket} className="btn btn-success">
          ĐẶT VÉ
        </button>
      </div>
    </div>
  ) : (
    "LOADING..."
  );
}
