import { notification } from "antd";
import { maHeThongRap } from "constants/common";
import { useAsync } from "hook/useAsync";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovieScheduleApi, fetchAddShowTimeApi } from "services/booking";
import {
  fetchCinamaGroupBySytemApi,
  fetchCinemaSytemApi,
  fetchCumRapApi,
} from "services/cinema";
import { fetchMovieDetailApi } from "services/movie";
import { formatDate } from "utils/common";

export default function MovieScheduleForm() {
  const navigate = useNavigate();

  const params = useParams();

  const formRef = useRef();

  const [state, setState] = useState({
    maHeThongRap: "",
    maCumRap: "",
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const { state: movieDetail = [] } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
  });

  console.log(movieDetail);

  const { state: cumRap } = useAsync({
    service: () => fetchCinamaGroupBySytemApi(state.maHeThongRap),
    dependecies: [state.maHeThongRap],
    condition: !!state.maHeThongRap,
  });

  console.log(cumRap);
  //   const renderHeThongRap

  const renderHeThongRap = () => {
    return maHeThongRap.map((ele, index) => {
      return (
        <option key={index} value={ele}>
          {ele}
        </option>
      );
    });
  };

  const renderMaCumRap = () => {
    return cumRap?.map((ele, index) => {
      return (
        <option value={ele.maCumRap} key={index}>
          {ele.tenCumRap}
        </option>
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitData = {
      maPhim: movieDetail.maPhim,
      ngayChieuGioChieu: formatDate(
        state.ngayChieuGioChieu,
        "DD/MM/YYYY hh:mm:ss"
      ),
      giaVe: Number(state.giaVe),
      maRap: state.maRap,
    };

    console.log(submitData);

    try {
      await addMovieScheduleApi(submitData);
      notification.success({
        message: "Tạo lịch chiếu thành công!",
      });
      navigate("/admin/movie-management");
    } catch (errors) {
      notification.warning({
        message: errors.response.data.content,
      });
    }
  };

  return (
    <div className="container">
      <h2 style={{ fontWeight: "bolder" }}>
        Tạo lịch chiếu - {movieDetail.tenPhim}
      </h2>
      <div className="row mt-5">
        <div className="col-4">
          <img
            src={movieDetail.hinhAnh}
            alt="image"
            className="img-fluid"
            height="100%"
            width="100%"
          />
        </div>
        <div className="col-8">
          <div className="card p-0">
            <div className="card-body">
              <form ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-film"></i>
                        </span>
                      </div>
                      <select
                        className="form-control form-select"
                        onChange={handleChange}
                        name="maHeThongRap"
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          Chọn hệ thống rạp
                        </option>
                        {renderHeThongRap()}
                      </select>
                    </div>
                  </div>
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-tv"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        onChange={handleChange}
                        name="maRap"
                      >
                        <option>Chọn cụm rạp</option>
                        {renderMaCumRap()}
                      </select>
                    </div>
                  </div>
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-calendar"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="date"
                        className="form-control"
                        placeholder="Ngày khởi chiếu"
                        onChange={handleChange}
                        name="ngayChieuGioChieu"
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-money-bill"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Giá vé"
                        name="giaVe"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-success mr-2">
                    CREATE SCHEDULE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
