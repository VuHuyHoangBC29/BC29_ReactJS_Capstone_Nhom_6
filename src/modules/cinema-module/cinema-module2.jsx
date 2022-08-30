import "./cinema-module.scss";
import { Tabs } from "antd";
import { GROUP_ID } from "constants/common";
import { useAsync } from "hook/useAsync";
import React, { useState } from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { fetchShowTimesByCinemaSystem } from "services/cinema";
import { formatDate } from "utils/common";
const { TabPane } = Tabs;

export default function CinemaModule2() {
  const { state: cinemaInfo } = useAsync({
    dependecies: [],
    service: () => fetchShowTimesByCinemaSystem(GROUP_ID),
  });

  console.log(cinemaInfo);

  const [tabPosition, setTabPosition] = useState("top");

  const renderHeThongRap = () => {
    return cinemaInfo?.map((heThongRap, idx) => {
      return (
        <TabPane
          tab={<img src={heThongRap.logo} className="img-fluid" width="80" />}
          key={heThongRap.maHeThongRap}
          className="p-0"
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap.map((cumRap, idx) => {
              return (
                <TabPane
                  tab={
                    <div style={{ display: "flex" }} className="mx-auto my-3">
                      <img
                        src={heThongRap.logo}
                        width="50"
                        height="50"
                        alt="image"
                      />
                      <div className="pl-2 text-left">
                        <p>{cumRap.tenCumRap}</p>
                        <p className="m-0">
                          Địa chỉ:{" "}
                          {cumRap.diaChi.length > 50
                            ? cumRap.diaChi.substring(0, 30) + "..."
                            : cumRap.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={idx}
                  className="p-0"
                >
                  {cumRap.danhSachPhim.map((phim, idx) => {
                    return (
                      <Fragment key={idx}>
                        <div className="my-3">
                          <div className="row col-12 m-0">
                            <img
                              width="100%"
                              height="100%"
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              className="col-4 col-xl-2 p-0"
                            />
                            <div className="col-8 col-xl-10 pl-3">
                              <h5>{phim.tenPhim}</h5>
                              <div className="row col-12 m-0 p-0">
                                {phim.lstLichChieuTheoPhim.map(
                                  (lichChieu, idx) => {
                                    return (
                                      <NavLink
                                        style={{
                                          color: "#b61883",
                                          textDecoration: "none",
                                        }}
                                        className="col-12 col-lg-6 col-xl-4 mb-2 p-0"
                                        to={`/booking/${lichChieu.maLichChieu}`}
                                      >
                                        {formatDate(
                                          lichChieu.ngayChieuGioChieu,
                                          "llll"
                                        )}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div id="cinemaModule">
      <div className="container py-3">
        <Tabs tabPosition={tabPosition} centered={true}>
          {renderHeThongRap()}
        </Tabs>
      </div>
    </div>
  );
}
