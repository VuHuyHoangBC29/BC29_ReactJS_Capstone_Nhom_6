import { useAsync } from "hook/useAsync";
import MovieListModule from "modules/movie-list-module/movie-list-module";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "../../services/movie";

export default function MovieList() {
  return (
    <div id="movie-list">
      <MovieListModule />
    </div>
  );
}
