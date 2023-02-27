import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import { useLocation } from "react-router-dom";
import "./Navigation.css";
import CreateTransactionModal from "../CreateTransactionModal/Index";
import CreateCardModal from "../CreateCardModal";

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
  const sessionUser = useSelector((state) => state.session);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let userName = useSelector((state) => state.session.user);

  return (
    <div className="Vertical-Nav">
      <div className="navbar-nav">
        <div className="nav-item">
          <NavLink exact to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              className="VerticalNavbar-Home-Logo"
              alt="navbar homelogo"
            />
          </NavLink>
        </div>
        <div className="nav-item">
          <img
            src={process.env.PUBLIC_URL + "/userIcon.png"}
            className="userIcon-img"
          />
        </div>
        <div className="nav-item-username">{userName?.username}</div>
        <NavLink className="nav-item-allCards" to="/dashboard/cards">
          <img
            src={process.env.PUBLIC_URL + "/multipleCards.png"}
            className="multipleCards-img"
          />
          <div className="link-text-allCards">All Cards</div>
        </NavLink>
        <div className="nav-item-createTransaction">
          <img
            src={process.env.PUBLIC_URL + "/makeTransaction.png"}
            className="transact-img"
          />
          {<CreateTransactionModal />}
        </div>
        <div className="nav-item-allCards">
          <img
            src={process.env.PUBLIC_URL + "/addCard.png"}
            className="addCard-img"
          />
          {<CreateCardModal />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
