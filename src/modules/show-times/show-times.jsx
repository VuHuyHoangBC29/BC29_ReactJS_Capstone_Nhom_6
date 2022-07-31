import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieShowTimesApi } from "../../services/cinema";
import moment from "moment";

export default function ShowTimes() {
  const params = useParams();

  const [showTimes, setShowTimes] = useState({});

  useEffect(() => {
    fetchMovieShowTimes();
  }, []);

  const fetchMovieShowTimes = async () => {
    const result = await fetchMovieShowTimesApi(params.movieId);

    setShowTimes(result.data.content);

    console.log(result.data.content);
  };

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
          {ele.tenHeThongRap}
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
                <div className="col-1">
                  <img className="img-fluid rounded" src={ele.hinhAnh} />
                </div>
                <div className="col-11 pl-0">
                  <h5>{ele.tenCumRap}</h5>
                  <span className="text-muted">{ele.diaChi}</span>
                </div>
                <div className="col-12">
                  <div className="row">
                    {ele.lichChieuPhim.map((ele) => {
                      return (
                        <div key={ele.maLichChieu} className="col-3">
                          <a href="#">
                            {moment(ele.ngayChieuGioChieu).format("LLLL")}
                          </a>
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
    <div className="row">
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
          <div className="tab-pane fade" id="bhd" role="tabpanel">
            ...
          </div>
        </div>
      </div>
    </div>
  );
}
