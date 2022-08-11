import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editUserByUserApi,
  fetchAccountInfoApi,
  fetchUserInfoApi,
} from "../../services/user";
import { useSelector } from "react-redux";
import moment from "moment";
import { useAsync } from "hook/useAsync";
import { notification } from "antd";

import "./profile-info-form.scss";

export default function ProfileInfoForm() {
  const navigate = useNavigate();

  const formRef = useRef();

  const [state, setState] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      soDT: "",
      email: "",
      maNhom: "",
      hoTen: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      soDT: "",
      email: "",
      maNhom: "",
      hoTen: "",
    },
  });

  const handleChange = (event) => {
    const {
      name,
      value,
      title,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    let message = "";
    if (patternMismatch) {
      message = `${title} không đúng kiểu dữ liệu`;
    }
    if (valueMissing) {
      message = `${title} bị rỗng`;
    }
    setState({
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: message },
    });
  };

  const { state: userInfo } = useAsync({
    dependencies: [],
    service: () => fetchAccountInfoApi(),
  });

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      setState((state) => ({
        ...state,
        values: userInfo,
      }));
    }
  }, [userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    try {
      await editUserByUserApi(state.values);
      notification.success({
        message: "Cập nhật thành công",
      });
      window.location.reload(false);
      //   navigate(`/profile-info/${state.values.taiKhoan}`);
    } catch (errors) {
      notification.danger({
        message: errors.response.data.content,
      });
    }
  };

  const { taiKhoan, hoTen, email, maNhom, soDT, matKhau } = state.values;

  return (
    <div id="profileInfoForm">
      <div className="col-12 p-5">
        <div className="card p-0 w-25 mx-auto">
          <div
            className="card-header text-light font-weight-bold text-center"
            style={{ fontSize: "25px", backgroundColor: "#b61883" }}
          >
            Thông tin tài khoản
          </div>
          <div className="card-body">
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control input-sm"
                    placeholder="Tài khoản"
                    name="taiKhoan"
                    onChange={handleChange}
                    title="(*) Tài khoản"
                    value={taiKhoan}
                  />
                </div>
                {state.errors.taiKhoan && (
                  <span className="text-danger">{state.errors.taiKhoan}</span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control input-sm"
                    placeholder="Họ tên"
                    name="hoTen"
                    onChange={handleChange}
                    title="(*) Họ tên"
                    value={hoTen}
                  />
                </div>
                {state.errors.hoTen && (
                  <span className="text-danger">{state.errors.hoTen}</span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope" />
                    </span>
                  </div>
                  <input
                    required
                    type="email"
                    className="form-control input-sm"
                    placeholder="Email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    name="email"
                    onChange={handleChange}
                    title="(*) Email"
                    value={email}
                  />
                </div>
                {state.errors.email && (
                  <span className="text-danger">{state.errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key" />
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="matKhau"
                    onChange={handleChange}
                    title="(*) Mật khẩu"
                    value={matKhau}
                  />
                </div>
                {state.errors.matKhau && (
                  <span className="text-danger">{state.errors.matKhau}</span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    name="soDT"
                    onChange={handleChange}
                    title="(*) Số điện thoại"
                    value={soDT}
                  />
                </div>
                {state.errors.soDT && (
                  <span className="text-danger">{state.errors.soDT}</span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-briefcase" />
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Mã nhóm"
                    name="maNhom"
                    onChange={handleChange}
                    title="(*) Mã nhóm"
                    value={maNhom}
                  />
                </div>
                {state.errors.maNhom && (
                  <span className="text-danger">{state.errors.maNhom}</span>
                )}
              </div>
              <div className="text-right">
                <button
                  disabled={!formRef.current?.checkValidity()}
                  type="submit"
                  className="btn mr-2"
                  id="btnUpdateProfile"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
