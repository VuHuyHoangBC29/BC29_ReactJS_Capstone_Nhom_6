import { Radio, Space, Tabs } from "antd";
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

  const renderHeThongRap = () => {
    return cinemaInfo?.map((heThongRap, idx) => {
      return (
        <TabPane
          tab={<img src={heThongRap.logo} className="img-fluid" width="20" />}
          key={heThongRap.maHeThongRap}
          className="p-0"
        >
          <Tabs tabPosition={"left"}>
            {heThongRap.lstCumRap.map((cumRap, idx) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{
                        width: "300px",
                      }}
                      className="d-flex"
                    >
                      <img
                        src={heThongRap.logo}
                        width="20"
                        height="20"
                        alt="image"
                      />
                      <div className="pl-2 text-left">
                        {cumRap.tenCumRap}
                        <p>{cumRap.diaChi}</p>
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
                            <div className="col-8 col-xl-10 pl-3 ">
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
                                        className="col-12 col-xl-4 mb-2 p-0"
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
          ;
        </TabPane>
      );
    });
  };

  return (
    <>
      <Tabs tabPosition={"left"}>{renderHeThongRap()}</Tabs>
    </>
  );
}
