import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./SplashPage.css";
import Footer from "./footer";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";

const SplashPage = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const location = useLocation();

  // const demoLogin = () => {
  //   dispatch(sessionActions.login("demo@aa.io", "password"));
  //   return (window.location.href = "/dashboard");
  // };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (location.pathname === "/") {
      window.location.href = "/dashboard";
      closeModal();
    }
  };

  return (
    <>
      <div className="Splash-Container">
        <div className="Splash-Text-Image-Container">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              className="Splash-Logo"
              alt="splash logo"
            />
            <h1 className="Splash-Text">
              The Next <br />
              <span className="Splash-GenerationSpan">Generation</span>
              Payment Method
            </h1>
          </div>
          <div className="Splash-GetStarted-Container">
            <div className="Splash-GetStarted" onClick={demoLogin}>
              Try <br />
              Demo
            </div>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + "/robotarm.png"}
              className="robotarm"
              alt="roboimage"
            />
            <div className="Splash-Background-Gradient" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SplashPage;
