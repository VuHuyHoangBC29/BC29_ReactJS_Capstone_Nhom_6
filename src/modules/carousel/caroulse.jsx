import { Carousel as CarouselAntd } from "antd";
import React from "react";

export default function Carousel() {
  const contentStyle = {
    margin: "auto",
    width: "80%",
    height: "750px",
    objectFit: "contain",
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <CarouselAntd afterChange={onChange}>
      <div>
        <img
          style={contentStyle}
          src="http://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2017/07/26020212/poster-phim-hanh-dong.jpg"
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://goggler.my/wp-content/uploads/2019/12/JM2_INTL_30Sht_BRIDGE_03-e1575889045252.jpg"
        />
      </div>
    </CarouselAntd>
  );
}
