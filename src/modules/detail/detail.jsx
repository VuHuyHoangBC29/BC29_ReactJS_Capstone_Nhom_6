import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../services/movie";
import moment from "moment";
import "./detail.scss";
import { formatDate } from "../../utils/common";
import { useAsync } from "hook/useAsync";

export default function Detail() {
  const params = useParams();
  // const [movieDetail, setMovieDetail] = useState({});

  const { state: movieDetail = {} } = useAsync({
    dependencies: [],
    service: () => fetchMovieDetailApi(params.movieId),
  });

  // useEffect(() => {
  //   fetchMovieDetail();
  // }, []);

  // const fetchMovieDetail = async () => {
  //   const result = await fetchMovieDetailApi(params.movieId);

  //   setMovieDetail(result.data.content);

  //   console.log(result.data.content);
  // };

  return (
    <div id="detail" className="row">
      <div className="col-3">
        <img className="w-100" src={movieDetail.hinhAnh} />
      </div>
      <div className="col-9 text-light">
        <h4 className="text-light">{movieDetail.tenPhim}</h4>
        <p>{movieDetail.moTa}</p>
        <p>
          {" "}
          Premiere:{" "}
          <span style={{ color: "#b61883", fontWeight: "bold" }}>
            {" "}
            {formatDate(movieDetail.ngayKhoiChieu, "LLL")}
          </span>
        </p>
        <div>
          <button type="button" data-toggle="modal" data-target="#trailer">
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
