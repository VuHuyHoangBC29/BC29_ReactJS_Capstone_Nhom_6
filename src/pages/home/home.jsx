import React from "react";
import Caroulse from "../../modules/carousel/caroulse";
import MovieList from "../../modules/movie-list/movie-list";

export default function Home() {
  return (
    <div className="py-5">
      <Caroulse />
      <MovieList />
    </div>
  );
}
