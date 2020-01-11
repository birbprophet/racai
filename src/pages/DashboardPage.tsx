import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import moment from "moment";
import DailySpecialCard from "../components/DailySpecialCard";
import { IDailySpecial } from "../interfaces";
import { airtable } from "../scripts/airtable";

const Page: React.FC = () => {
  const [dailySpecials, setDailySpecials] = useState<IDailySpecial[]>([]);

  useEffect(() => {
    airtable("Daily")
      .select({
        maxRecords: 5,
        view: "Grid view",
        sort: [{ field: "ID", direction: "desc" }]
      })
      .firstPage((err: any, records: any) => {
        if (err) {
          console.error(err);
          return;
        }
        const airtableDailySpecials: IDailySpecial[] = records.map(
          (record: any) => {
            const cutoffTime = record.get("CutoffTime");

            const hoursLeft = moment(cutoffTime).diff(moment(), "hours");
            const minutesLeft = moment(cutoffTime)
              .subtract(hoursLeft, "hours")
              .diff(moment(), "minutes");

            return {
              name: record.get("Name"),
              description: record.get("Description"),
              imgSrc: record.get("Image")[0].thumbnails.large.url,
              ingredients: record.get("Ingredients"),
              collectionDate: moment(record.get("Date")).format("MMM D YYYY"),
              collectionTime: record.get("Time"),
              collectionLocation: record.get("Location"),
              hoursLeft: hoursLeft > 0 ? hoursLeft : 0,
              minutesLeft: minutesLeft > 0 ? minutesLeft : 0,
              id: record.id,
              loading: false
            };
          }
        );
        setDailySpecials(airtableDailySpecials);
      });
  }, []);

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
