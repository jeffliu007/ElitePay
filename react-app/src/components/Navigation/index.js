import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session);

  return (
    <div className="Navbar">
      <div className="leftNav">
        <NavLink exact to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="Navbar-Home-Logo"
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
