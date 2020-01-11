import React from "react";
import { IDailySpecial } from "../interfaces";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";

interface Props {
  dailySpecial: IDailySpecial;
}
const Component: React.FC<Props> = ({ dailySpecial }: Props) => {
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
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Component;
