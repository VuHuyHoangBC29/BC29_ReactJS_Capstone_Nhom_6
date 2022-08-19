import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./footer.scss";

export default function Footer() {
  return (
    <div id="footer" className="container-fluid">
      <div className="py-5 px-5 row">
        <div className="col-12 col-md-4 col-lg-4 col-xl-3 mt-2">
          <NavLink className="navbar-brand mx-auto" to="/">
            Cyber <br /> Cinema
          </NavLink>
          <p className="mt-3 text-light" style={{ fontSize: "20px" }}>
            <span
              style={{
                color: "#b61883",
                fontFamily: "Pacifico",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              Cyber Cinema
            </span>{" "}
            - Go-to place for movie lovers, where you can get the latest news on
            the hottest movies worldwide, as well as experience our top-quality
            cinemas.
            {/* - Điểm đến của các tín đồ yêu phim, nơi bạn có thể theo dõi
            thông tin cũng như đặt vé xem các bộ phim mới nhất, hot nhất trên
            thị trường. */}
          </p>
        </div>
        <div className="col-6 col-md-4 col-lg-4 col-xl-3 mt-3">
          <h3 className="mb-4 about">About us</h3>
          <ul style={{ width: "50%" }}>
            <li>
              <a href="#">Introduction</a>
            </li>
            <li>
              <a href="#">Schedule</a>
            </li>
            <li>
              <a href="#">Cinemas</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md-4 col-lg-4 col-xl-3 mt-3">
          <h3 className="mb-4 support">Supports</h3>
          <ul style={{ width: "50%" }}>
            <li>
              <a href="#">Help center</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Policy</a>
            </li>
            <li>
              <a href="#">Member's benefit</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-12 col-lg-12 col-xl-3 mt-3">
          <h3 className="mb-4 partner">Partners</h3>
          <div className="footer-img row">
            <div className="col">
              <img className="img-fluid" src={require("./BHD.png")} alt="BHD" />
            </div>

            <div className="col">
              <img
                className="img-fluid"
                src={require("./CGV2.jpg")}
                alt="BHD"
              />
            </div>

            <div className="col">
              <img
                className="img-fluid"
                src={require("./LOTTE.png")}
                alt="BHD"
              />
            </div>

            <div className="col">
              <img
                className="img-fluid"
                src={require("./megastar.png")}
                alt="BHD"
              />
            </div>

            <div className="col">
              <img
                className="img-fluid"
                src={require("./GALAXY2.png")}
                alt="BHD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
