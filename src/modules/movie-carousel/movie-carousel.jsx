import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "../../services/movie";
import { Carousel, Card, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./movie-carousel.scss";
import { LoadingContext } from "../../context/loading.context";
import { useAsync } from "../../hook/useAsync";

export default function MovieCarousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const navigate = useNavigate();

  // const [movieList, setMovieList] = useState([]);

  // const [_, setLoadingState] = useContext(LoadingContext);

  const { state: movieList = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieListApi(),
  });

  // useEffect(() => {
  //   fetchMovieListApi();
  // }, []);

  // const fetchMovieList = async () => {
  //   setLoadingState({ isLoading: true });

  //   const result = await fetchMovieListApi();

  //   console.log(result);

  //   setLoadingState({ isLoading: false });

  //   setMovieList(result.data.content);
  // };

  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div className="movieItem" key={ele.maPhim}>
          <div className="mx-2">
            <div className="card" style={{ overflow: "hidden" }}>
              <img
                // style={{ height: 450, objectFit: "cover" }}
                className="card-img-top"
                src={ele.hinhAnh}
                alt="movie"
              />
              <div className="cardBodyOverlay">
                <div className="card-body">
                  <h5 className="card-title">{ele.tenPhim}</h5>
                  <button
                    onClick={() => navigate(`/movie/${ele.maPhim}`)}
                    className="btn"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      id="movieCarouselContainer"
      style={{ height: "80vh" }}
      className="d-flex align-items-center"
    >
      <div id="videoOverlay"></div>
      <video src="./videoplayback.mp4" autoPlay loop muted></video>

      <div id="movieCarousel" className="container py-5">
        <Carousel
          slidesToShow={3}
          slidesToScroll={1}
          arrows
          dots={false}
          infinite
          style={{ zIndex: "2" }}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {renderMovieList()}
        </Carousel>
      </div>
    </div>
  );
}
