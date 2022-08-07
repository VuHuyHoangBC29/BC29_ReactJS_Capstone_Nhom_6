import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { setUserInfoAction } from "../../store/actions/userAction";

import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  return (
    <div className="header container-md container p-0">
      <nav className="navbar navbar-expand-md row p-0">
        <div className="col-3 navbar navbar-expand-md">
          <NavLink id="brand" className="navbar-brand" to="/">
            Cyber <br /> Cinema
          </NavLink>
        </div>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="col-9 collapse navbar-collapse p-0 mx-auto"
          id="collapsibleNavId"
        >
          <ul
            className="d-flex mb-0 text-light ml-auto p-0"
            style={{ listStyle: "none", alignItems: "center" }}
          >
            <li className="nav-item">
              <NavLink className="nav-link px-lg-4 px-2" to="/">
                TRANG CHỦ
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link px-lg-4 px-2" to="/movie">
                PHIM
              </NavLink>
            </li>
            <li className="nav-item ">
              <a className="nav-link px-lg-4 px-2" href="#">
                LỊCH CHIẾU
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link px-lg-4 px-2" href="#">
                CỤM RẠP
              </a>
            </li>
            <li className="nav-item ">
              {!userState.userInfo ? (
                <>
                  <button
                    className="btn btn-outline-info my-2 my-sm-0 mr-2"
                    type="sumit"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-outline-success my-2 my-sm-0"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Xin chào,{" "}
                    <span style={{ color: "#b61883" }}>
                      {userState.userInfo.hoTen}.{" "}
                    </span>
                  </span>
                  <button onClick={handleLogout} className=" log-out">
                    <i
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="fa-solid fa-right-from-bracket mt-1"
                    ></i>
                  </button>
                </>
              )}
            </li>
          </ul>

          {/* <div className="ml-auto">
            {!userState.userInfo ? (
              <>
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-2"
                  type="sumit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-success my-2 my-sm-0"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <span>Xin chào, {userState.userInfo.hoTen}. </span>
                <button onClick={handleLogout} className="btn btn-danger">
                  LOGOUT
                </button>
              </>
            )}
          </div> */}
        </div>
      </nav>
    </div>
  );
}
