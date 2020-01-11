import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import DailySpecialCard from "../components/DailySpecialCard";
import { IDailySpecial } from "../interfaces";

const Page: React.FC = () => {
  const dailySpecial: IDailySpecial = {
    name: "Summer Paradise",
    description:
      "Açaí na tigela is a Brazilian specialty from Pará and Amazonas. It is a dish made of the frozen and mashed fruit of the açaí palm.",
    imgSrc: "/assets/images/acai-bowl-example.jpg",
    ingredients: [
      "Acai Berries",
      "Bananas",
      "Strawberries",
      "Almonds",
      "Blueberries"
    ],
    collectionTime: "12 Jan 2020, 12-2pm",
    collectionLocation: "NTU Hall 2 Block X Room X"
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RACAI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DailySpecialCard dailySpecial={dailySpecial} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
