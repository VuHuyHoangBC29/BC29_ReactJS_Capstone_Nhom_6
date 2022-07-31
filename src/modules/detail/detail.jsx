import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../services/movie";
import moment from "moment";

export default function Detail() {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);

    setMovieDetail(result.data.content);

    console.log(result.data.content);
  };

  return (
    <div className="row">
      <div className="col-3">
        <img className="w-100" src={movieDetail.hinhAnh} />
      </div>
      <div className="col-9">
        <h4>{movieDetail.tenPhim}</h4>
        <p>{movieDetail.moTa}</p>
        <p>{moment(movieDetail.ngayKhoiChieu).format("LL")}</p>
        <div>
          <button className="btn btn-info mr-2">TRAILER</button>
        </div>
      </div>
    </div>
  );
}
