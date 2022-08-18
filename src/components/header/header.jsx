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
                    Account
                  </div>
                ),
                key: "0",
              },
              {
                label: (
                  <div
                    onClick={() =>
                      navigate(
                        `/booking-history/${userState.userInfo.taiKhoan}`
                      )
                    }
                  >
                    Booking history
                  </div>
                ),
                key: "1",
              },
              {
                label: <div onClick={() => navigate("/admin")}>Admin page</div>,
                key: "3",
              },
              {
                type: "divider",
              },
              {
                label: <div onClick={handleLogout}>Logout</div>,
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
                    Account
                  </div>
                ),
                key: "0",
              },
              {
                label: (
                  <div
                    onClick={() =>
                      navigate(
                        `/booking-history/${userState.userInfo.taiKhoan}`
                      )
                    }
                  >
                    Booking history
                  </div>
                ),
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
    <div id="header">
      <nav className="navbar navbar-expand-md row py-4 flex-column">
        <div id="userUnfoNav">
          <ul
            className="d-flex mb-0 text-light mx-auto p-0"
            style={{ listStyle: "none", alignItems: "center" }}
          >
            <li className="nav-item text-center">
              <NavLink className="nav-link px-lg-4 px-2" to="/">
                Home
              </NavLink>
            </li>
            {!userState.userInfo ? (
              <div className="nav-item ml-2 row">
                <li className="nav-item text-center">
                  <NavLink className="nav-link px-lg-4 px-2" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink className="nav-link px-lg-4 px-2" to="/login">
                    Login
                  </NavLink>
                </li>
              </div>
            ) : (
              <li className="nav-item ml-3">
                <span
                  style={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Welcome,{" "}
                </span>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space
                      style={{
                        color: "#b61883",
                        fontWeight: "bold",
                      }}
                    >
                      {userState.userInfo.hoTen}
                    </Space>
                  </a>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
        <div id="pagesNav">
          <ul
            className="d-flex mt-2 text-light mx-auto p-0"
            style={{ listStyle: "none", alignItems: "center" }}
          >
            <li
              id="movieList"
              className="nav-item"
              onClick={() => navigate("/movie")}
            >
              <NavLink className="nav-link" to="/movie">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1000 1000"
                  enableBackground="new 0 0 1000 1000"
                  xmlSpace="preserve"
                  width="80px"
                  height="80px"
                >
                  <path
                    id="path3460"
                    d="M899.4,411c10.8,68-35.7,131.9-103.6,142.7c-68.1,10.7-132-35.6-142.8-103.7c-10.7-68.1,35.7-131.9,103.7-142.7C824.7,296.5,888.7,343,899.4,411z M731.4,838.2c-57.9,37.6-135,21-172.6-36.7c-37.4-57.8-21.2-134.9,36.7-172.5c57.7-37.6,135-21.1,172.5,36.7C805.5,723.4,789,800.7,731.4,838.2L731.4,838.2z M433.8,500c0-36.6,29.6-66.1,66.2-66.1c36.6,0,66.2,29.5,66.2,66.1c0,36.7-29.6,66.2-66.2,66.2C463.4,566.2,433.8,536.6,433.8,500z M420.1,826.3c-51.2,46-130,42-176.1-9.2c-46.1-51.3-42-130.1,9.1-176.2c51.3-46.1,130.1-42,176.2,9.2C475.4,701.3,471.2,780.2,420.1,826.3L420.1,826.3z M109.9,379.8c28-63,101.7-91.2,164.6-63.2c62.9,28,91.1,101.7,63.3,164.6c-28,63-101.8,91.2-164.8,63.2C110.2,516.4,81.8,442.7,109.9,379.8z M500,104.1c69,0,124.8,55.8,124.8,124.7c0,68.9-55.8,124.8-124.8,124.8c-68.8,0-124.7-55.8-124.7-124.8C375.3,159.9,431.2,104.1,500,104.1z M500,10C229.4,10,10,229.4,10,500.1c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10"
                  />
                </svg>
              </NavLink>
            </li>
            <li id="cinemaList" className="nav-item">
              <NavLink className="nav-link" to="/cinema">
                <i className="fa-solid fa-ticket"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
