import React, { useGlobal } from "reactn";
import { IonContent, IonPage } from "@ionic/react";
import moment from "moment";
import DailySpecialCard from "../components/DailySpecialCard";
import { IDailySpecial } from "../interfaces";

import AppHeader from "../components/AppHeader";

const Page: React.FC = () => {
  const [dailySpecials] = useGlobal("dailySpecials");

  const dailySpecial: IDailySpecial = dailySpecials[0] || {
    name: "Loading...",
    description: "Fetching the latest daily special...",
    imgSrc: "assets/images/acai-bowl-example.jpg",
    ingredients: [],
    collectionDate: moment().format("MMM D YYYY"),
    collectionTime: "",
    collectionLocation: "",
    hoursLeft: 0,
    minutesLeft: 0,
    id: "",
    loading: true
  };

  const previousSpecials: IDailySpecial[] = dailySpecials.slice(1);

  return (
    <IonPage>
      <AppHeader />
      <IonContent>
        <DailySpecialCard dailySpecial={dailySpecial} isDaily />
        <div className="mt-16 mb-12">
          <div className="mx-6 text-2xl font-bold text-gray-900 font-slab">
            Previous Specials
          </div>
          <div className="mx-6 mt-4 h-1 bg-gray-900" />
        </div>
        {previousSpecials.map((previousSpecial: IDailySpecial) => (
          <DailySpecialCard
            key={previousSpecial.name + previousSpecial.collectionDate}
            dailySpecial={previousSpecial}
            isDaily={false}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Page;
