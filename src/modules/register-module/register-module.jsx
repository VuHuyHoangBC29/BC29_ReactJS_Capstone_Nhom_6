import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "../../services/user";
import { notification } from "antd";

import "./register-module.scss";

export default function RegisterModule() {
  const navigate = useNavigate();

  const formRef = useRef();

  const [state, setState] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      values: { ...state.values, [name]: value },
    });
  };

  const handleBlur = (event) => {
    const {
      name,
      value,
      title,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;

    let message = "";

    if (patternMismatch) {
      message = `${title} không đúng định dạng.`;
    }

    if (tooShort || tooLong) {
      message = `${title} phải nằm trong khoảng ${minLength} - ${maxLength} ký tự.`;
    }

    if (valueMissing) {
      message = `${title} không thể bỏ trống.`;
    }

    setState({
      ...state,
      errors: {
        ...state.errors,
        [name]: message,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    const submitData = state.values;

    console.log(submitData);

    // await registerUserApi(submitData);

    try {
      await registerUserApi(state.values);
      notification.success({ message: "Đăng ký thành công!" });
      navigate("/login");
    } catch (errors) {
      notification.warning({ message: errors.response.data.content });
    }
  };
  
  return (
    <div id="register">
      <div className="registerContent mx-auto py-5">
        <div className="card p-0">
          <div className="card-header font-weight-bold">Đăng ký thành viên</div>
          <div className="card-body">
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Tài khoản</label>
                    <input
                      title="Tài khoản"
                      required
                      minLength={5}
                      maxLength={20}
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.taiKhoan && (
                      <span className="text-danger">
                        {state.errors.taiKhoan}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Họ tên</label>
                    <input
                      title="Họ tên"
                      required
                      minLength={3}
                      maxLength={20}
                      name="hoTen"
                      type="text"
                      className="form-control"
                      pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.hoTen && (
                      <span className="text-danger">{state.errors.hoTen}</span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      title="Mật khẩu"
                      required
                      name="matKhau"
                      type="password"
                      className="form-control"
                      pattern= "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.matKhau && (
                      <span className="text-danger">
                        {state.errors.matKhau}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                      required
                      title="Số điện thoại"
                      name="soDt"
                      type="text"
                      className="form-control"
                      pattern="^[0-9]+$"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.soDt && (
                      <span className="text-danger">{state.errors.soDt}</span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      required
                      name="email"
                      title="Email"
                      type="text"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.email && (
                      <span className="text-danger">{state.errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Mã nhóm</label>
                    <input
                      required
                      title="Mã nhóm"
                      name="maNhom"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {state.errors.maNhom && (
                      <span className="text-danger">{state.errors.maNhom}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                id="btnRegister"
                disabled={!formRef.current?.checkValidity()}
                className="btn btn-success mr-2"
                type="submit"
              >
                Đăng ký
              </button>
              <button
                id="btnReset"
                onClick={() => {
                  setState({
                    values: {
                      taiKhoan: "",
                      matKhau: "",
                      email: "",
                      soDt: "",
                      maNhom: "",
                      hoTen: "",
                    },
                    errors: {
                      taiKhoan: "",
                      matKhau: "",
                      email: "",
                      soDt: "",
                      maNhom: "",
                      hoTen: "",
                    },
                  });
                }}
                type="reset"
                className="btn btn-outline-dark"
              >
                RESET
              </button>
              <p className="mt-3">
                Đã là thành viên?{" "}
                <Link style={{ color: "#b61883" }} to="/login">
                  Đăng nhập ngay!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
