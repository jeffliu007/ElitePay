import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import { useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session);
  const location = useLocation();

  return (
    <div
      className={`Navbar ${
        location.pathname === "/" ? "Navbar-transparent" : "Navbar"
      }`}
    >
      <div className="leftNav">
        <NavLink exact to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="Navbar-Home-Logo"
            alt="navbar homelogo"
          />
        </NavLink>
      </div>
      <div className="rightNav">
        {isLoaded && sessionUser.user && (
          <ProfileButton user={sessionUser.user} />
        )}
        {!sessionUser.user && (
          <div className="Login-Signup-Holder">
            <OpenModalButton
              buttonText="Log In"
              className="login"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              className="signup cleanButton"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
