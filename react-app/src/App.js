import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { VerticalNavigation } from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import AllCardsPage from "./components/AllCardsPage";
import SingleCardPage from "./components/SingleCardPage";
import DashboardPage from "./components/DashboardPage";
import SingleTransactionPage from "./components/SingleTransactionPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const isSplashPage = location.pathname === "/";
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isSplashPage ? (
        <Navigation isLoaded={isLoaded} />
      ) : (
        <VerticalNavigation isLoaded={isLoaded} />
      )}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/dashboard/cards/:cardId">
            <SingleCardPage />
          </Route>
          <Route path="/dashboard/cards" exact>
            <AllCardsPage />
          </Route>
          <Route path="/dashboard" exact>
            <DashboardPage />
          </Route>
          <Route path="/dashboard/transactions/:transactionId">
            <SingleTransactionPage />
          </Route>
          <Route path="/" exact>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
