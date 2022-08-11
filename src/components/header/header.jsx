import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { setUserInfoAction } from "../../store/actions/userAction";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";

import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);

  console.log(userState);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  const menu = (
    <Menu
      items={
        userState?.userInfo?.maLoaiNguoiDung === "QuanTri"
          ? [
              {
                label: (
                  <div
                    onClick={() =>
                      navigate(`/profile-info/${userState.userInfo.taiKhoan}`)
                    }
                  >
                    Tài khoản
                  </div>
                ),
                key: "0",
              },
              {
                label: <div onClick={() => navigate("/")}>Lịch sử đặt vé</div>,
                key: "1",
              },
              {
                label: (
                  <div onClick={() => navigate("/")}>Giao diện quản lý</div>
                ),
                key: "3",
              },
              {
                type: "divider",
              },
              {
                label: <div onClick={handleLogout}>Đăng xuất</div>,
                key: "4",
              },
            ]
          : [
              {
                label: (
                  <div
                    onClick={() =>
                      navigate(`/profile-info/${userState.userInfo.taiKhoan}`)
                    }
                  >
                    Tài khoản
                  </div>
                ),
                key: "0",
              },
              {
                label: <div onClick={() => navigate("/")}>Lịch sử đặt vé</div>,
                key: "1",
              },
              {
                type: "divider",
              },
              {
                label: <div onClick={handleLogout}>Đăng xuất</div>,
                key: "4",
              },
            ]
      }
    />
  );

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
                    }}
                  >
                    Xin chào,{" "}
                    {/* <span style={{ color: "#b61883" }}>
                      {userState.userInfo.hoTen}.{" "}
                    </span> */}
                  </span>
                  {/* <button onClick={handleLogout} className=" log-out">
                    <i
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="fa-solid fa-right-from-bracket mt-1"
                    ></i>
                  </button> */}
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space
                        style={{
                          color: "#b61883",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {userState.userInfo.hoTen}
                      </Space>
                    </a>
                  </Dropdown>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
