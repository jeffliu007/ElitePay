import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SplashPage.css";

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // const demoLogin = () => {
  //   dispatch(sessionActions.login("demo@aa.io", "password"));
  //   return history.push("/dashboard");
  // };

  return (
    <>
      <div className="Splash-Container">
        <div className="Splash-Text-Image-Container">
          <h1 className="Splash-Text">
            The Next <br />
            <span className="Splash-GenerationSpan">Generation</span>
            Payment Method
          </h1>
          <div className="Splash-GetStarted">
            <div>
              Get <br />
              Started
            </div>
            <i class="fa-solid fa-arrow-up"></i>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/robotarm.png"}
            className="robotarm"
          />
        </div>
      </div>
    </>
  );
};

export default SplashPage;
