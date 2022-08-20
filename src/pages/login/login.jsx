import LoginForm from "modules/login-form/login-form";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { loginApi } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";

import "./login.scss";

export default function Login() {
  return <LoginForm />;
}
