import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { loginApi } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formRef = useRef();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await loginApi(state);

    localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content));

    dispatch(setUserInfoAction(result.data.content));

    navigate("/");

    console.log(result);
  };

  return (
    // <form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
    //   <div className="form-group">
    //     <label>Tài khoản: </label>
    //     <input
    //       name="taiKhoan"
    //       onChange={handleChange}
    //       type="text"
    //       className="form-control"
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label>Mật khẩu: </label>
    //     <input
    //       name="matKhau"
    //       onChange={handleChange}
    //       type="password"
    //       className="form-control"
    //     />
    //   </div>
    //   <button className="btn btn-success w-100">LOGIN</button>
    // </form>

    <div className="w-25 mx-auto my-5">
      <div className="card p-0">
        <div
          style={{ fontSize: "30px" }}
          className="card-header text-center font-weight-bold"
        >
          Welcome to CyberCinema
        </div>
        <div className="card-body">
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className=" col-12 form-group my-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Tài khoản"
                    onChange={handleChange}
                    name="taiKhoan"
                  />
                </div>
              </div>

              <div className=" col-12 form-group my-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                    name="matKhau"
                  />
                </div>
              </div>
            </div>
            <p>
              Chưa là thành viên?{" "}
              <span>
                <Link to="/register">Đăng ký ngay!</Link>
              </span>
            </p>

            <div className="text-right">
              <button type="submit" className="btn btn-success mr-2">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
