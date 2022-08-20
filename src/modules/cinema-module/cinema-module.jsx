import { GROUP_ID, maHeThongRap } from "constants/common";
import { useAsync } from "hook/useAsync";
import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchShowTimesByCinemaSystem } from "services/cinema";
import { formatDate } from "utils/common";

import "./cinema-module.scss";

export default function CinemaModule() {
  const navigate = useNavigate();

  const [cinemaShowTimes, setCinemaShowTimes] = useState();

  const handleSelect = async (maHeThongRap) => {
    const result = await fetchShowTimesByCinemaSystem(maHeThongRap, GROUP_ID);
    setCinemaShowTimes(result.data.content);

    console.log(result.data.content);
  };

  useEffect(() => {
    fetchFirstCinemaInfo();
  }, []);

  const fetchFirstCinemaInfo = async () => {
    const result = await fetchShowTimesByCinemaSystem(
      maHeThongRap[0],
      GROUP_ID
    );

    setCinemaShowTimes(result.data.content);
  };

  const renderTab = () => {
    return maHeThongRap.map((ele, idx) => {
      return (
        <li className="nav-item" key={ele}>
          <a
            className={`nav-link ${idx === 0 && "active"}`}
            id="pills-home-tab"
            data-toggle="pill"
            href={`#${ele}`}
            role="tab"
            aria-selected="true"
            onClick={() => handleSelect(ele)}
          >
            {ele}
          </a>
        </li>
      );
    });
  };

  const renderTabContent = () => {
    return cinemaShowTimes?.map((ele, idx) => {
      return (
        <div
          className={`tab-pane fade show ${idx === 0 && "active"}`}
          role="tabpanel"
          key={ele.maHeThongRap}
        >
          {ele.lstCumRap.map((ele, idx) => {
            return (
              <div className="row cinemaDetails p-3 my-5" key={ele.maCumRap}>
                <div id="cinemaAddress" className="col-12 col-lg-5">
                  <div className="row mb-3">
                    <div className="col-4">
                      <img className="img-fluid rounded" src={ele.hinhAnh} />
                    </div>
                    <div className="col-8 pl-0 text-light">
                      <h4 className="text-light" style={{ fontWeight: "bold" }}>
                        {ele.tenCumRap}
                      </h4>
                      <span>Địa chỉ: {ele.diaChi}</span>
                    </div>
                  </div>
                </div>
                <div id="cinemaMovies" className="col-12 col-lg-7 ">
                  {ele.danhSachPhim.map((ele) => {
                    return (
                      <div className="text-light mb-5" key={ele.maPhim}>
                        <div className="row">
                          <div className="col-lg-4 col-12">
                            <img
                              src={ele.hinhAnh}
                              alt={ele.hinhAnh}
                              width={150}
                              height={150}
                            />
                          </div>
                          <div className="col-lg-8 col-12">
                            <h3
                              className="text-light m-0"
                              style={{ fontWeight: "bold" }}
                            >
                              {ele.tenPhim}
                            </h3>
                            <p className="text-light mt-2 mb-3">
                              Thời gian:{" "}
                              <span>{formatDate(ele.ngayChieuGioChieu)}</span>
                            </p>

                            <button
                              //  to={`/movie/${ele.maPhim}`}
                              onClick={() => navigate(`/movie/${ele.maPhim}`)}
                            >
                              Xem thêm
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div id="cinemaModule">
      <div className="cinemaModuleContent">
        <ul
          className="nav nav-pills mb-3 d-flex justify-content-center py-5"
          id="pills-tab"
          role="tablist"
        >
          {renderTab()}
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
