import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // const demoLogin = () => {
  //   dispatch(sessionActions.login("demo@aa.io", "password"));
  //   return history.push("/api/dashboard/cards");
  // };

  return (
    <>
      <div className="Splash-Container">
        <div className="Splash-Text-Image-Container">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              className="Splash-Logo"
            />
            <h1 className="Splash-Text">
              The Next <br />
              <span className="Splash-GenerationSpan">Generation</span>
              Payment Method
            </h1>
          </div>
          <div className="Splash-GetStarted-Container">
            <div className="Splash-GetStarted">
              Get <br />
              Started
            </div>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + "/robotarm.png"}
              className="robotarm"
            />
            <div className="Splash-Background-Gradient" />
          </div>
          <div className="Splash-Background-Gradient" />
        </div>
      </div>
    </>
  );
};

export default SplashPage;
