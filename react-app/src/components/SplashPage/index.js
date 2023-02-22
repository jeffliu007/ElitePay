import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
};
