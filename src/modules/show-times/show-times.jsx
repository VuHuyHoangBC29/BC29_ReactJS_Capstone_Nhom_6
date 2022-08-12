import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchMovieShowTimesApi } from "../../services/cinema";
import moment from "moment";
import "./show-times.scss";
import { Tabs } from "antd";
import { formatDate } from "../../utils/common";
import { useAsync } from "hook/useAsync";

export default function ShowTimes() {
  const { TabPane } = Tabs;

  const navigate = useNavigate();

  const params = useParams();

  // const [showTimes, setShowTimes] = useState({});

  const { state: showTimes = {} } = useAsync({
    dependencies: [],
    service: () => fetchMovieShowTimesApi(params.movieId),
  });

  console.log(showTimes);
  // useEffect(() => {
  //   fetchMovieShowTimes();
  // }, []);

  // const fetchMovieShowTimes = async () => {
  //   const result = await fetchMovieShowTimesApi(params.movieId);

  //   setShowTimes(result.data.content);

  //   console.log(result.data.content);
  // };

  const renderTabs = () => {
    return showTimes?.heThongRapChieu?.map((ele, idx) => {
      return (
        <a
          className={`nav-link text-capitalize ${idx === 0 && "active"}`}
          data-toggle="pill"
          href={`#${ele.maHeThongRap}`}
          role="tab"
          aria-selected="true"
          key={ele.maHeThongRap}
        >
          <img src={ele.logo} alt="image" width={70} height={70} />
        </a>
      );
    });
  };

  const renderTabContent = () => {
    return showTimes?.heThongRapChieu?.map((ele, idx) => {
      return (
        <div
          className={`tab-pane fade show ${idx === 0 && "active"}`}
          id={ele.maHeThongRap}
          key={ele.maHeThongRap}
          role="tabpanel"
        >
          {ele.cumRapChieu.map((ele) => {
            return (
              <div key={ele.maCumRap} className="row mb-5">
                <div className="col-lg-3">
                  <img className="img-fluid rounded" src={ele.hinhAnh} />
                </div>
                <div className="col-lg-9 pl-0">
                  <h5 id="tenCumRap" className="m-0">
                    {ele.tenCumRap}
                  </h5>
                  <p style={{ fontWeight: "bold" }}>Địa chỉ: {ele.diaChi}</p>
                </div>
                <div className="col-12 mt-3">
                  <div className="row">
                    {ele.lichChieuPhim.map((ele) => {
                      return (
                        <div key={ele.maLichChieu} className="col-3 mb-3">
                          <p className="mb-0">
                            Thời gian:{" "}
                            <span
                              style={{ color: "#b61883", fontWeight: "bold" }}
                            >
                              {formatDate(ele.ngayChieuGioChieu)}
                            </span>
                          </p>
                          <Link
                            className="btnDatVe"
                            to={`/booking/${ele.maLichChieu}`}
                          >
                            Đặt vé
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div id="showTimes" className="row">
      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {/* {showTimes?.heThongRapChieu?.map((ele, idx) => {
            return (
              <a
                className="nav-link text-capitalize active"
                data-toggle="pill"
                href="#galaxy"
                role="tab"
                aria-selected="true"
                key={ele.maHeThongRap}
              >
                {ele.tenHeThongRap}
              </a>
            );
          })} */}
          {renderTabs()}
        </div>
      </div>
      <div className="col-9">
        <div className="tab-content" id="v-pills-tabContent">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
