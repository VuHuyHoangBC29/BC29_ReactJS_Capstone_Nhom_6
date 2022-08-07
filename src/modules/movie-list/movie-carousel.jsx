import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "../../services/movie";
import { Carousel, Card, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./movie-carousel.scss";

export default function MovieCarousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await fetchMovieListApi();

    console.log(result);

    setMovieList(result.data.content);
  };

  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div className="movieItem" key={ele.maPhim}>
          <div className="mx-2">
            <div className="card">
              <img
                style={{ height: 400, objectFit: "cover" }}
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
                    XEM CHI TIẾT
                  </button>

                  {/* <Button
                    type="primary"
                    danger
                    size="medium"
                    style={{ fontWeight: "bold" }}
                    onClick={() => navigate(`/movie/${ele.maPhim}`)}
                  >
                    XEM CHI TIẾT
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="movieCarousel" className="container py-5">
      {/* {renderMovieList()} */}
      <Carousel slidesToShow={4} slidesToScroll={1} arrows dots={false} infinite>
        {renderMovieList()}
      </Carousel>
    </div>
  );
}
