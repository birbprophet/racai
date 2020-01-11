import React, { useState } from "react";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import IngredientsList from "./IngredientsList";
import { IDailySpecial } from "../interfaces";

interface Props {
  dailySpecial: IDailySpecial;
  isDaily: boolean;
}
const Component: React.FC<Props> = ({ dailySpecial, isDaily }: Props) => {
  const [detailsClicked, setDetailsClicked] = useState<boolean>(false);
  const handleDetailsOnClicked = () => {
    setDetailsClicked(!detailsClicked);
  };
  const isActive: boolean =
    dailySpecial.hoursLeft > 0 && dailySpecial.minutesLeft > 0;

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
          <div className="mt-6">
            <button className="rounded w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600 tracking-widest">
              ORDER NOW
            </button>
          </div>

          <div className="mt-6 mx-1">
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
                  <span className="text-lg font-semibold">Collection:</span>
                </div>
                <div className="mt-2">
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
    </IonCard>
  ) : (
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
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default Component;
