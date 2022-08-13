import Logo from "components/logo/logo";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function HomeLayout() {
  return (
    <div>
      <div>
        <Logo />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
