import React from "react";
import { useNavigate } from "react-router-dom";
import "./logo.scss";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div id="neonLogoBackground" className="d-flex justify-content-center">
      <div id="neonLogoBackgroundOverlay"></div>
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
