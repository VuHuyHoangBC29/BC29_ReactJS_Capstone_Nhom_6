import { Carousel} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchBannerListApi } from "../../services/movie";

export default function Carousels() {
  let [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    fetchBannerList();
  }, []);

  const fetchBannerList = async () => {
    const result = await fetchBannerListApi();
    console.log(result);
    setBannerList(result.data.content);
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const renderBanner = () => {
    return bannerList?.map((ele, idx) => {
      return (
        <div className={`carousel-item ${idx === 0 && "active"}`} key={idx}>
          <img
            src={ele.hinhAnh}
            alt={ele.maBanner}
            style={{ width: "100%", height: "100vh" }}
          />
        </div>
      );
    });
  };

  return <Carousel>{renderBanner()}</Carousel>;
}
