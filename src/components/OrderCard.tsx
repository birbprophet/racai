import React, { useState, useGlobal } from "reactn";
import { IonAlert, IonCard, IonCardContent, IonCardTitle } from "@ionic/react";

import { IDailyOrder } from "../interfaces";
import moment from "moment";
import { airtable } from "../scripts/airtable";

interface Props {
  dailyOrder: IDailyOrder;
}

const Component: React.FC<Props> = ({ dailyOrder }: Props) => {
  const [refreshCount, setRefreshCount] = useGlobal("refreshCount");
  const [instructionsClicked, setInstructionsClicked] = useState<boolean>(
    false
  );
  let orderStatus: string = "Loading...";
  let orderLocked: boolean =
    dailyOrder.hoursLeft === 0 && dailyOrder.minutesLeft === 0;
  if (!dailyOrder.paid) {
    orderStatus = "Awaiting payment confirmation";
  } else if (!dailyOrder.ready) {
    orderStatus = "Your order is being prepared";
  } else if (!dailyOrder.received) {
    orderStatus = "Your order is ready";
  } else {
    orderStatus = "Order has been collected";
  }
  const handleInstructionsOnClick = () => {
    setInstructionsClicked(true);
  };
  const handleCancelOnClick = () => {
    airtable("Orders").destroy([dailyOrder.id], function(
      err: any,
      deletedRecords: any[]
    ) {
      if (err || deletedRecords.length < 1) {
        console.error(err);
      }
      setRefreshCount(refreshCount + 1);
    });
  };

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
        {orderLocked ? (
          <></>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleInstructionsOnClick}
              className="px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
            >
              Instructions
            </button>
            <button
              onClick={handleCancelOnClick}
              className="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-700 ml-2"
            >
              Cancel Order
            </button>
          </div>
        )}
      </IonCardContent>
      <IonAlert
        isOpen={instructionsClicked}
        onDidDismiss={() => setInstructionsClicked(false)}
        header={"Payment Instructions"}
        message={`For payment, please transfer $5 to +6584883341 via PayNow with
              message: "Order ${dailyOrder.orderId}"`}
        buttons={["OK"]}
      />
    </IonCard>
  );
};

export default Component;
