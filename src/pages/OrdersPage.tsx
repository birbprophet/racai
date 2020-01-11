import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner
} from "@ionic/react";

import { IDailyOrder } from "../interfaces";
import { airtable } from "../scripts/airtable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../scripts/firebase";

import OrderCard from "../components/OrderCard";
import moment from "moment";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const [currentOrders, setCurrentOrders] = useState<IDailyOrder[] | null>(
    null
  );

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
                  dailyName: record.get("DailyName"),
                  dailyDate: record.get("DailyDate"),
                  paid: record.get("Paid"),
                  ready: record.get("Completed"),
                  received: record.get("Delivered"),
                  hoursLeft: hoursLeft > 0 ? hoursLeft : 0,
                  minutesLeft: minutesLeft > 0 ? minutesLeft : 0,
                  id: record.id
                };
              })
            );
          }
        });
    }
  }, [user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <span className="font-slab text-xl text-purple-800 font-black tracking-wider">
              RACAI
            </span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mt-12 mb-12">
          <div className="mx-6 text-3xl font-bold text-gray-900 font-slab">
            Orders
          </div>
          <div className="mx-6 mt-4 h-1 bg-gray-900" />
        </div>
        {currentOrders === null ? (
          <div className="w-full flex content-center justify-center">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <></>
        )}
        {currentOrders?.map(currentOrder => (
          <OrderCard key={currentOrder.id} dailyOrder={currentOrder} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Page;
