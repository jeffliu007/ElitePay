import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // const demoLogin = () => {
  //   dispatch(sessionActions.login("demo@aa.io", "password"));
  //   return history.push("/dashboard");
  // };

  return (
    <>
      <div className="Splash-Container"></div>
    </>
  );
};

export default SplashPage;
