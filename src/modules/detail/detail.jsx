import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../services/movie";
import moment from "moment";
import "./index.scss";

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
        <p> Premiere: {moment(movieDetail.ngayKhoiChieu).format("LL")}</p>
        <div>
          <button
            type="button"
            data-toggle="modal"
            data-target="#trailer"
            className="btn btn-info mr-2"
          >
            TRAILER
          </button>
        </div>

        <div
          className="modal fade"
          id="trailer"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <iframe
                width={560}
                height={315}
                src={movieDetail.trailer}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* <video
                width={560}
                height={315}
                src={movieDetail.trailer}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></video> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
