import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
// import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const location = useLocation();

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(["Invalid Credentials"]);
    } else {
      if (location.pathname === "/") window.location.href = "/dashboard";
      closeModal();
    }
  };

  const demoLogin2 = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("marnie@aa.io", "password"));
    if (data) {
      setErrors(["Invalid Credentials"]);
    } else {
      if (location.pathname === "/") window.location.href = "/dashboard";
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Invalid Credentials"]);
    } else {
      if (location.pathname === "/") window.location.href = "/dashboard";
      closeModal();
    }
  };

  return (
    <div className="Global-Modal-Container">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        className="Global-Logo"
        alt="global-logo"
      />
      <div className="Global-Modal-Header">Log in to ElitePay</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => {
            return (
              <li className="Global-Errors-LI" key={idx}>
                {error}
              </li>
            );
          })}
        </ul>

        <label for="email" className="Global-Modal-Label">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="Global-Modal-input"
          />
        </label>
        <label for="password" className="Global-Modal-Label">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Log In
        </button>
        <div onClick={demoLogin} className="Login-Demo">
          Try demo 1
        </div>
        <div onClick={demoLogin2} className="Login-Demo">
          Try demo 2
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
