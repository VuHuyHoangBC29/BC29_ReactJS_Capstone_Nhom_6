import { useAsync } from "hook/useAsync";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "../../services/movie";

import "./movie-list-module.scss";

export default function MovieListModule() {
  const navigate = useNavigate();

  const { state: movieList = [] } = useAsync({
    dependecies: [],
    service: () => fetchMovieListApi(),
  });

  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div className="col-12 col-md-6 col-lg-4" key={ele.maPhim}>
          <div
            className="card movie-card"
            style={{ marginBottom: 30, height: 600 }}
          >
            <img
              style={{ height: 500, objectFit: "cover", overflow: "hidden" }}
              className="card-img-top"
              src={ele.hinhAnh}
              alt="movie"
            />
            <div className="card-body">
              <h5 className="card-title">{ele.tenPhim}</h5>
              <button
                onClick={() => navigate(`/movie/${ele.maPhim}`)}
                className="btn btn-info"
              >
                XEM CHI TIẾT
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div className="row pt-3 mx-auto w-75">{renderMovieList()}</div>;
}
