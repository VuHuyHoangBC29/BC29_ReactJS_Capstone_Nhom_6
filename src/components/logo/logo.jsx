import React from "react";
import { useNavigate } from "react-router-dom";
import "./logo.scss";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div id="neonLogoBackground" className="d-flex justify-content-center">
      {/* <div id="neonLogoBackgroundOverlay">
        <div id="icon1">
          <i class="fas fa-theater-masks"></i>
        </div>
      </div> */}
      <div id="icon1">
        <i class="fas fa-theater-masks"></i>
      </div>
      <div id="icon2">
        <i class="fas fa-film"></i>
      </div>
      <div
        id="neonLogo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Cyber <br /> Cinema
      </div>
    </div>
  );
}
