import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./scripts/firebase";

import { setupConfig, IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* CSS */
import "typeface-roboto";
import "typeface-roboto-slab";
import "./css/index.css";
import "./css/fonts.css";
import "./css/styles.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./AppPage";
import TOSPage from "./pages/TOSPage";

setupConfig({
  mode: "ios"
});

const App: React.FC = () => {
  const [user, initialising] = useAuthState(auth);
  return (
    <IonApp>
      <IonReactRouter>
        <Route
          path="/"
          render={() =>
            initialising ? (
              <>
                <IonLoading isOpen={true} translucent />
              </>
            ) : user ? (
              <Redirect to="/app" />
            ) : (
              <HomePage />
            )
          }
          exact={true}
        />
        <Route
          path="/login"
          render={() =>
            initialising ? (
              <>
                <IonLoading isOpen={true} translucent />
                <LoginPage />
              </>
            ) : user ? (
              <Redirect to="/app" />
            ) : (
              <LoginPage />
            )
          }
          exact={true}
        />
        <Route path="/app" component={AppPage} />
        <Route path="/tos" component={TOSPage} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
