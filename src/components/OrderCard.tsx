import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardTitle
} from "@ionic/react";

import { IDailyOrder } from "../interfaces";
import moment from "moment";

interface Props {
  dailyOrder: IDailyOrder;
}

const Component: React.FC<Props> = ({ dailyOrder }: Props) => {
  let orderStatus: string = "Loading...";
  if (!dailyOrder.paid) {
    orderStatus = "Awaiting payment confirmation";
  } else if (!dailyOrder.ready) {
    orderStatus = "Your order is being prepared";
  } else if (!dailyOrder.received) {
    orderStatus = "Your order is ready";
  } else {
    orderStatus = "Order has been collected";
  }

  return (
    <IonCard>
      <IonCardContent>
        <div className="font-semibold tracking-widest text-sm">
          DAILY: {dailyOrder.dailyDate}
        </div>
        <div className="mt-2">
          <IonCardTitle>{dailyOrder.dailyName}</IonCardTitle>
        </div>
        <div className="mt-4 text-sm">
          <div className="flex">
            <div className="w-20">Ordered:</div>
            <div>{moment(dailyOrder.orderTime).format("MMM D, h:mm a")}</div>
          </div>
          <div className="flex">
            <div className="w-20">Status:</div>
            <div>{orderStatus}</div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Component;
