import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./footer.scss";

export default function Footer() {
  return (
    <div id="footer" className="text-light container-fluid">
      <div className=" py-5 px-5 row">
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <NavLink
            className="navbar-brand mx-auto"
            style={{
              color: "#b61883",
              fontFamily: "Pacifico",
              fontWeight: "bold",
              fontSize: "30px",
            }}
            to="/"
          >
            Cyber <br /> Cinema
          </NavLink>
          <p className="mt-3 text-dark">
            <span
              style={{
                color: "#b61883",
                fontFamily: "Pacifico",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Cyber Cinema
            </span>{" "}
            - Điểm đến của các tín đồ yêu phim, nơi bạn có thể theo dõi thông
            tin cũng như đặt vé xem các bộ phim mới nhất, hot nhất trên thị
            trường.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 about">Về chúng tôi</h4>
          <ul style={{ width: "50%" }}>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Lịch chiếu</a>
            </li>
            <li>
              <a href="#">Cụm rạp</a>
            </li>
            <li>
              <a href="#">Tin tức</a>
            </li>
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 support">Hỗ trợ khách hàng</h4>
          <ul style={{ width: "50%" }}>
            <li>
              <a href="#">Trung tâm hỗ trợ</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="#">Quyền lợi thành viên</a>
            </li>
            <li>
              <a href="#">Câu hỏi thường gặp</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 partner">Đối tác</h4>
          <div className="footer-img row">
            <div className="col">
              <img className="img-fluid" src={require("./BHD.png")} alt="BHD" />
            </div>

            <div className="col">
              <img className="img-fluid" src={require("./CGV2.jpg")} alt="BHD" />
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
