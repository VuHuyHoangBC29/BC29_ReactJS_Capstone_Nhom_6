import { GROUP_ID, maHeThongRap } from "constants/common";
import { useAsync } from "hook/useAsync";
import React from "react";
import { useState } from "react";
import { fetchShowTimesByCinemaSystem } from "services/cinema";

import "./cinema-module.scss";

export default function CinemaModule() {
  const [cinemaShowTimes, setCinemaShowTimes] = useState();

  const handleSelect = async (maHeThongRap) => {
    const result = await fetchShowTimesByCinemaSystem(maHeThongRap, GROUP_ID);
    setCinemaShowTimes(result.data.content);
  };

  console.log(cinemaShowTimes);

  const renderTab = () => {
    return maHeThongRap.map((ele, idx) => {
      return (
        <a
          key={ele}
          className={`nav-link ${idx === 0 && "active"}`}
          data-toggle="pill"
          role="tab"
          aria-selected="true"
          onClick={() => handleSelect(ele)}
        >
          {ele}
        </a>
      );
    });
  };

  const renderTabContent = () => {
    return cinemaShowTimes?.map((ele, idx) => {
      return (
        <div
          class={`tab-pane fade show ${idx === 0 && "active"} text-light`}
          role="tabpanel"
          key={ele.maHeThongRap}
        >
          {ele.tenHeThongRap}
        </div>
      );
    });
  };

  return (
    <div id="cinemaModule">
      <div className="row">
        <div className="col-3">
          <div
            class="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {renderTab()}
          </div>
        </div>

        <div className="col-9">
          <div class="tab-content" id="v-pills-tabContent">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
