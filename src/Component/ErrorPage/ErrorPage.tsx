import { NavLink } from "react-router-dom";
import "./ErrorPage.scss";
import { FiArrowUpLeft } from "react-icons/fi";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div className="errorPage">
        <div className="errorPage__wrapper">
          <div className="errorPage__wrapper--image">
            <img
              className="errorPage__wrapper-image"
              src="/appImages/404.svg"
            />
            <h2 className="errorPage__wrapper--title">Oops!</h2>
            <p className="errorPage__wrapper--subtitle">
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </p>
            <NavLink to="/">
              <button className="errorPage__wrapper--button">
                <FiArrowUpLeft className="no-items__wrapper--button-icon" />
                Back to Home
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
