import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent
} from "@ionic/react";

import { IDailyOrder } from "../interfaces";
import { airtable } from "../scripts/airtable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../scripts/firebase";

import OrderCard from "../components/OrderCard";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const [currentOrders, setCurrentOrders] = useState<IDailyOrder[] | null>(
    null
  );

  console.log(currentOrders);
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
                return {
                  userName: record.get("UserName"),
                  userEmail: record.get("UserEmail"),
                  orderTime: record.get("OrderTime"),
                  dailyName: record.get("DailyName"),
                  dailyDate: record.get("DailyDate"),
                  paid: record.get("Paid"),
                  ready: record.get("Completed"),
                  received: record.get("Delivered"),
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
        <div className="mt-12 mb-8">
          <div className="mx-6 text-3xl font-bold text-gray-900 font-slab">
            Orders
          </div>
          <div className="mx-6 mt-4 h-1 bg-gray-900" />
        </div>
        {currentOrders?.map(currentOrder => (
          <OrderCard key={currentOrder.id} dailyOrder={currentOrder} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Page;
