import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import TypistLoop from "react-typist-loop";

const Page: React.FC = () => {
  const typistLoopTextList: string[] = ["boredom", "hongsters", "low GPA"];

  return (
    <IonPage>
      <IonContent>
        <div className="h-full flex flex-col">
          <div className="w-full px-8 py-4">
            <div className="font-slab text-2xl text-purple-800 font-black tracking-wider">
              RACAI
            </div>
          </div>
          <div className="pt-10 px-8 flex-1 bg-gray-100">
            <div className="flex flex-col">
              <div className="text-4xl font-slab font-bold">
                An açaí a day
                <br />
                keeps the
              </div>
              <div className="h-16">
                <TypistLoop interval={0}>
                  {typistLoopTextList.map((text, idx) => (
                    <Typist
                      key={idx}
                      startDelay={1000}
                      cursor={{
                        show: false,
                        blink: true,
                        element: "_"
                      }}
                    >
                      <div className="font-slab font-bold text-5xl text-purple-800">
                        {text}
                      </div>
                      <Typist.Delay ms={4000} />
                      {Array.prototype.map.call(text, char => (
                        <Typist.Backspace key={char} count={1} delay={25} />
                      ))}
                    </Typist>
                  ))}
                </TypistLoop>
              </div>
            </div>
            <div className="text-4xl font-slab font-bold">away</div>
            <div className="mt-6">
              <div className="text-lg text-gray-700">
                Racai's homemade açaí bowls are made with of fresh, 100% natural
                ingredients.
              </div>
            </div>
            <div className="mt-12">
              <Link to="/login">
                <button className="w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600">
                  TRY A BOWL TODAY
                </button>
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
