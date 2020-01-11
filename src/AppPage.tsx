import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading
} from "@ionic/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./scripts/firebase";

import { apps, home, contact } from "ionicons/icons";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import AccountPage from "./pages/AccountPage";

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={props => {
        return user || initialising ? (
          initialising ? (
            <>
              <Component {...props} />
              <IonLoading isOpen={true} translucent />
            </>
          ) : (
            <Component {...props} />
          )
        ) : (
          // if user is not logged in
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

const ReactComponent: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <ProtectedRoute
          path="/app/dashboard"
          component={DashboardPage}
          exact={true}
        />
        <ProtectedRoute
          path="/app/orders"
          component={OrdersPage}
          exact={true}
        />
        <ProtectedRoute path="/app/account" component={AccountPage} />
        <Route
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/dashboard">
          <IonIcon icon={home.md} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/app/orders">
          <IonIcon icon={apps.md} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/app/account">
          <IonIcon icon={contact.md} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ReactComponent;
