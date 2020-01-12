import React, { useState, useGlobal } from "reactn";
import { IonCard, IonCardContent, IonCardTitle, IonAlert } from "@ionic/react";
import IngredientsList from "./IngredientsList";
import { IDailySpecial, IDailyOrder } from "../interfaces";
import { airtable } from "../scripts/airtable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../scripts/firebase";

import OtherSpecialCard from "./OtherSpecialCard";

interface Props {
  dailySpecial: IDailySpecial;
  isDaily: boolean;
}
const Component: React.FC<Props> = ({ dailySpecial, isDaily }: Props) => {
  const [user] = useAuthState(auth);
  const [currentOrders] = useGlobal("currentOrders");
  const [detailsClicked, setDetailsClicked] = useState<boolean>(false);
  const [orderId, setOrderId] = useGlobal("orderId");
  const [instructionsDismissed, setInstructionsDismissed] = useState<boolean>(
    false
  );
  const [orderFailed, setOrderFailed] = useState<boolean>(false);

  const handleDetailsOnClicked = () => {
    setDetailsClicked(!detailsClicked);
  };
  const isActive: boolean =
    dailySpecial.hoursLeft > 0 && dailySpecial.minutesLeft > 0;

  const orderExists =
    isDaily &&
    (currentOrders || []).filter((order: IDailyOrder) => {
      return order.dailyDate === dailySpecial.collectionDate;
    }).length > 0;

  const orderSuccess = orderId !== null;

  const handleOrderOnClicked = () => {
    airtable("Orders").create(
      [
        {
          fields: {
            Daily: [dailySpecial.id],
            Completed: false,
            Delivered: false,
            Paid: false,
            UserName: user?.displayName || "Unknown User",
            UserEmail: user?.email || "Unknown User"
          }
        }
      ],
      (err: any, records: any) => {
        if (err || !records || !records.length) {
          setOrderFailed(true);
        } else {
          setOrderId(records[0].get("ID"));
        }
      }
    );
  };

  return isDaily ? (
    <IonCard>
      <img
        src={dailySpecial.imgSrc}
        alt={dailySpecial.name}
        className="h-48 object-cover"
      />
      <IonCardContent>
        <div>
          <div className="mb-4">
            <div className="font-semibold tracking-widest text-sm">
              AÇAÍ OF THE DAY:{" "}
              {dailySpecial.collectionDate
                .slice(0, dailySpecial.collectionDate.length - 5)
                .toUpperCase()}
            </div>
            <div className="mt-2">
              <IonCardTitle>{dailySpecial.name}</IonCardTitle>
            </div>
          </div>
          <div>{dailySpecial.description}</div>
          <div className="mt-6 h-16">
            {orderSuccess || orderExists ? (
              <div className="rounded w-full py-4 font-bold bg-green-200 text-green-900 text-xl tracking-widest text-center">
                ORDER SENT
              </div>
            ) : (
              <button
                onClick={handleOrderOnClicked}
                className="rounded w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600 tracking-widest"
              >
                ORDER NOW
              </button>
            )}
          </div>
          {orderFailed ? (
            <div className="text-red-700 ml-1">
              Order unsuccessful, please try again.
            </div>
          ) : (
            <></>
          )}

          <div className="mt-4 mx-1">
            <div className="flex">
              <div onClick={handleDetailsOnClicked}>
                <u className="cursor-pointer">
                  {detailsClicked ? "Hide Details" : "Show Details"}
                </u>
              </div>
              <div className="flex-1" />
              <div>
                {isActive ? (
                  <i>
                    {dailySpecial.hoursLeft} hours {dailySpecial.minutesLeft}{" "}
                    mins left
                  </i>
                ) : dailySpecial.loading ? (
                  <i>Loading...</i>
                ) : (
                  <i>Order window closed</i>
                )}
              </div>
            </div>
          </div>
          {detailsClicked ? (
            <div className={"flex flex-col mt-6 pb-4"}>
              <IngredientsList ingredients={dailySpecial.ingredients} />
              <div className="mt-4">
                <div>
                  <span className="text-lg font-semibold">
                    Collection / Details:
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex">
                    <span className="w-24">Price:</span>
                    <span>{`$${dailySpecial.price}.00`}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Date/Time:</span>
                    <span>
                      {dailySpecial.collectionDate},{" "}
                      {dailySpecial.collectionTime}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Location:</span>
                    <span>{dailySpecial.collectionLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </IonCardContent>
      <IonAlert
        isOpen={orderSuccess || instructionsDismissed}
        onDidDismiss={() => setInstructionsDismissed(true)}
        header={"Payment Instructions"}
        message={`For payment, please transfer $${dailySpecial.price} to +6584883341 via PayNow with
        message: "Order ${orderId}"`}
        buttons={["OK"]}
      />
    </IonCard>
  ) : (
    <OtherSpecialCard dailySpecial={dailySpecial} />
  );
};
export default Component;
