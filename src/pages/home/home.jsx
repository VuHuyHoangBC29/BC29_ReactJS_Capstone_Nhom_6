import React from "react";
import Carousels from "../../modules/carousel/carousel";
import MovieCarousel from "../../modules/movie-list/movie-carousel";

export default function Home() {
  return (
    <div>
      <Carousels />
      <MovieCarousel/>
    </div>
  );
}
