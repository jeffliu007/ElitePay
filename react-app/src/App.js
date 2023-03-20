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
import DashboardPage from "./components/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/NotFoundPage";
import ChatPage from "./components/ChatPage";

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
          <ProtectedRoute path="/dashboard/cards" exact>
            <AllCardsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard" exact>
            <DashboardPage />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard/chat" exact>
            <ChatPage />
          </ProtectedRoute>
          <Route path="/" exact>
            <SplashPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
