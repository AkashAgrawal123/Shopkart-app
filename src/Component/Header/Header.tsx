import { NavLink } from "react-router-dom";
import "./Heder.scss";
import Navbar from "../Navbar/Navbar";
import "../../styles/globalStyle.scss";
import React from "react";

const Header = () => {
  return (
    <section className="header">
      <div className="shopCart-container flex gap-6 items-center justify-between">
        <NavLink to="/">
          <img className="header__logo" src="/appImages/imageLogo.svg" />
        </NavLink>
        <Navbar />
      </div>
    </section>
  );
};

export default Header;
