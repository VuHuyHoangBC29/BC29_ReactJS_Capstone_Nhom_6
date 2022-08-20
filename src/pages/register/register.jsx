import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "../../services/user";
import { notification } from "antd";
import RegisterModule from "modules/register-module/register-module";

export default function Register() {
  return <RegisterModule />;
}
