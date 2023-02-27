import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import { useLocation, useHistory } from "react-router-dom";
import "./Navigation.css";
import CreateTransactionModal from "../CreateTransactionModal/Index";
import CreateCardModal from "../CreateCardModal";
import { logout } from "../../store/session";

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

export function VerticalNavigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => {
      history.push("/");
    });
  };

  let userName = useSelector((state) => state.session.user);

  return (
    <div className="Vertical-Nav">
      <div className="navbar-nav">
        <div className="nav-item1">
          <NavLink exact to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              className="VerticalNavbar-Home-Logo"
              alt="navbar homelogo"
            />
          </NavLink>
        </div>
        <div className="nav-item2">
          <NavLink className="nav-item" exact to="/dashboard">
            <img
              src={process.env.PUBLIC_URL + "/userIcon.png"}
              className="userIcon-img"
            />
            <span className="nav-item-username">{userName?.username}</span>
            <span className="nav-item-logout" onClick={handleLogout}>
              Logout
            </span>
          </NavLink>
        </div>
        <div className="nav-item3">
          <NavLink className="nav-item-allCards" to="/dashboard/cards">
            <img
              src={process.env.PUBLIC_URL + "/multipleCards.png"}
              className="multipleCards-img"
            />
            <span className="nav-item-allCards-text">All Cards</span>
          </NavLink>
        </div>
        <div className="nav-item4">
          <img
            src={process.env.PUBLIC_URL + "/makeTransaction.png"}
            className="transact-img"
          />
          {<CreateTransactionModal />}
          <div className="transact-text">Transact</div>
        </div>
        <div className="nav-item5">
          <img
            src={process.env.PUBLIC_URL + "/addCard.png"}
            className="addCard-img"
          />
          {<CreateCardModal />}
          <div className="addCard-text">Add card</div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
