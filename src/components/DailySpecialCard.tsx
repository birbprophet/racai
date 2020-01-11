import React, { useState } from "react";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import IngredientsList from "./IngredientsList";
import { IDailySpecial } from "../interfaces";

type Props = { dailySpecial: IDailySpecial };
const Component: React.FC<Props> = ({ dailySpecial }: Props) => {
  const [detailsClicked, setDetailsClicked] = useState<boolean>(false);
  const handleDetailsOnClicked = () => {
    setDetailsClicked(!detailsClicked);
  };
  return (
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
            <button
              onClick={handleDetailsOnClicked}
              className="p-2 bg-gray-700 text-white focus:outline-none cursor-pointer"
            >
              {detailsClicked ? "Hide Details" : "Show Details"}
            </button>
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
  );
};
export default Component;
