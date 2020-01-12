import React, { useEffect, useGlobal } from "reactn";
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
import { airtable } from "./scripts/airtable";
import moment from "moment";

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
  const [user] = useAuthState(auth);
  const [, setCurrentOrders] = useGlobal("currentOrders");
  const [refreshCount] = useGlobal("refreshCount");
  const [orderId] = useGlobal("orderId");
  const [refresherOpen] = useGlobal("refresherOpen");

  useEffect(() => {
    if (user && user.email) {
      airtable("Orders")
        .select({
          sort: [{ field: "ID", direction: "desc" }],
          filterByFormula: `({UserEmail} = '${user.email}')`
        })
        .firstPage((err: any, records: any) => {
          if (err) {
            console.error(err);
          } else if (records.length > 0) {
            setCurrentOrders(
              records.map((record: any) => {
                const cutoffTime = record.get("CutoffTime")[0];

                const hoursLeft = moment(cutoffTime).diff(moment(), "hours");
                const minutesLeft = moment(cutoffTime)
                  .subtract(hoursLeft, "hours")
                  .diff(moment(), "minutes");

                return {
                  userName: record.get("UserName"),
                  userEmail: record.get("UserEmail"),
                  orderTime: record.get("OrderTime"),
                  dailyName: record.get("DailyName")[0],
                  dailyDate: moment(record.get("DailyDate")[0]).format(
                    "MMM D YYYY"
                  ),
                  paid: record.get("Paid"),
                  ready: record.get("Completed"),
                  received: record.get("Delivered"),
                  hoursLeft: hoursLeft > 0 ? hoursLeft : 0,
                  minutesLeft: minutesLeft > 0 ? minutesLeft : 0,
                  id: record.id,
                  orderId: record.get("ID")
                };
              })
            );
          }
        });
    }
  }, [user, setCurrentOrders, refreshCount, refresherOpen, orderId]);

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
